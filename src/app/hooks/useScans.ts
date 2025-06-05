import { useEffect, useState, useCallback } from "react";
import { Scan } from "../components/ScanStatsTable/types";

export function useScans() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resetting, setResetting] = useState<string | null>(null);

  const fetchScans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/qr");
      if (!res.ok) throw new Error("Błąd sieci");
      const data = await res.json();
      setScans(data.scans ?? []);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Wystąpił nieznany błąd");
    }
    setLoading(false);
  }, []);

  const resetScan = useCallback(async (id: string) => {
    setResetting(id);
    try {
      const res = await fetch(`/api/qr?id=${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: 0 }),
      });
      if (!res.ok) throw new Error("Nie udało się zresetować");
      await fetchScans();
    } catch {
      alert("Błąd resetowania!");
    }
    setResetting(null);
  }, [fetchScans]);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  return { scans, loading, error, fetchScans, resetScan, resetting };
}