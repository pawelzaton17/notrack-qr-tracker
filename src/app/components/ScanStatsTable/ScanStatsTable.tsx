"use client";

import { useEffect, useState } from "react";

const ScanStatsTable = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCount = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/qr");
      if (!res.ok) throw new Error("Błąd sieci");
      const data = await res.json();
      setCount(data.count);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Wystąpił nieznany błąd");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <section className="max-w-lg mx-auto mt-10 p-8 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/20 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow">
        Statystyki zeskanowanych kodów QR
      </h2>

      {loading && (
        <p className="text-center text-gray-200">Ładowanie danych...</p>
      )}
      {error && (
        <p className="text-center text-red-400 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/80">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold bg-gray-100 rounded-tl-xl">
                  ID
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold bg-gray-100 rounded-tr-xl">
                  Liczba zeskanowań
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition">
                <td className="py-3 px-6 border-b border-gray-200 font-mono text-gray-800">
                  qr
                </td>
                <td className="py-3 px-6 border-b border-gray-200 font-bold text-blue-700 text-lg">
                  {count}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={fetchCount}
          className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Odśwież dane
        </button>
      </div>
    </section>
  );
};

export default ScanStatsTable;
