"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScanPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const secret = searchParams.get("secret");

  useEffect(() => {
    const trackScan = async () => {
      if (!id || !secret) return;

      try {
        await fetch(`/api/track?id=${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secret}`,
          },
        });

        window.location.href = "https://centrumautomatyki.com.pl/";
      } catch (error) {
        console.error("Błąd przy zapisie skanu", error);
      }
    };

    trackScan();
  }, [id, secret]);

  return <p className="text-center mt-10">Przekierowywanie...</p>;
}
