import ScanStatsTable from "./components/ScanStatsTable/ScanStatsTable";

export default function Home() {
  return (
    <>
      <header className="bg-gray-900 text-white p-4 text-center font-bold text-xl">
        Monitor zeskanowanych kodów QR
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <ScanStatsTable />
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"></div>
      </main>

      <footer className="bg-gray-500 text-center p-4 text-sm text-gray-600">
        © 2025 NOTRACK
      </footer>
    </>
  );
}
