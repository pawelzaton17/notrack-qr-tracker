"use client";

import { useEffect, useState } from "react";

export default function ScanStatsTable() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCount() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/qr");
      if (!res.ok) throw new Error("Błąd sieci");
      const data = await res.json();
      setCount(data.count);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <section className="max-w-xl mx-auto p-8 font-sans">
      <h2 className="text-2xl font-semibold mb-4">
        Statystyki zeskanowanych kodów QR
      </h2>

      {loading && <p>Ładowanie danych...</p>}
      {error && <p className="text-red-600">Wystąpił błąd: {error}</p>}

      {!loading && !error && (
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Liczba zeskanowań
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-300">qr</td>
              <td className="py-2 px-4 border-b border-gray-300">{count}</td>
            </tr>
          </tbody>
        </table>
      )}

      <button
        onClick={fetchCount}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Odśwież dane
      </button>
    </section>
  );
}
