import Link from "next/link";
import { HistoryLog } from "@/components/HistoryLog";

export default function HistoryPage() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-16 gap-8">
      <header className="w-full max-w-lg flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">History</h1>
          <p className="text-zinc-500 text-sm mt-1">Your completed tasks.</p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors duration-200"
        >
          ← Back
        </Link>
      </header>

      <HistoryLog />
    </main>
  );
}
