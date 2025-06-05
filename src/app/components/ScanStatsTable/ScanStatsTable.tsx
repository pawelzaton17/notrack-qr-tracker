"use client";

import { useScans } from "../../hooks/useScans";

const ScanStatsTable = () => {
  const { scans, loading, error, fetchScans, resetScan, resetting } =
    useScans();

  return (
    <section className="w-full max-w-3xl mx-auto mt-10 p-8 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/20 font-sans">
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
        <div>
          <table className="w-full bg-white/80">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold bg-gray-100 rounded-tl-xl min-w-[220px] whitespace-nowrap">
                  ID
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold bg-gray-100 min-w-[160px] whitespace-nowrap">
                  Liczba zeskanowań
                </th>
                <th className="py-3 px-6 text-right text-gray-700 font-semibold bg-gray-100 rounded-tr-xl min-w-[140px] whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr key={scan.id} className="hover:bg-blue-50 transition">
                  <td className="py-3 px-6 border-b border-gray-200 font-mono text-gray-800 whitespace-nowrap">
                    {scan.id}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 font-bold text-blue-700 text-lg">
                    {scan.count}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-right">
                    <button
                      onClick={() => resetScan(scan.id)}
                      disabled={resetting === scan.id}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-60"
                    >
                      {resetting === scan.id ? "Resetuję..." : "Resetuj"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={fetchScans}
          className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Odśwież dane
        </button>
      </div>
    </section>
  );
};

export default ScanStatsTable;
