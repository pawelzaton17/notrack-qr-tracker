"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScanPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const trackScan = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/qr?id=${id}`, {
          method: "POST",
        });

        if (!res.ok) {
          console.error("Błąd serwera podczas zapisu skanu");
          return;
        }

        window.location.href = "https://centrumautomatyki.com.pl/";
      } catch (error) {
        console.error("Błąd przy zapisie skanu", error);
      }
    };

    trackScan();
  }, [id]);

  return <p className="text-center mt-10">Przekierowywanie...</p>;
}
