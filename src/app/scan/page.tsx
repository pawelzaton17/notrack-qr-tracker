"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loader from "../components/Loader/Loader";

// Redir Map
const REDIRECTS: Record<string, string> = {
  centrumautomatyki: "https://centrumautomatyki.com.pl/",
  nokode: "https://nokode.eu/",
};

function ScanPageInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const trackScan = async () => {
      if (!id || !REDIRECTS[id]) {
        setNotFound(true);
        return;
      }

      try {
        const res = await fetch(`/api/qr?id=${id}`, {
          method: "POST",
        });

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        window.location.href = REDIRECTS[id];
      } catch {
        setNotFound(true);
      }
    };

    trackScan();
  }, [id]);

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center mt-16">
        <span className="text-white text-lg font-semibold">
          Nie znaleziono strony docelowej dla tego kodu QR.
        </span>
      </div>
    );
  }

  return <Loader />;
}

export default function ScanPage() {
  return (
    <Suspense>
      <ScanPageInner />
    </Suspense>
  );
}
