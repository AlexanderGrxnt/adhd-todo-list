"use client";

import { useAtom, useSetAtom } from "jotai";
import { historyAtom } from "@/lib/atoms";
import type { CompletedTask } from "@/lib/types";

const PRIORITY_LABEL: Record<CompletedTask["priority"], string> = {
  urgent: "🔴 Urgent",
  high: "🟠 High",
  normal: "⚪ Normal",
};

function formatDate(ts: number): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ts));
}

export function HistoryLog() {
  const [history, setHistory] = useAtom(historyAtom);

  function handleClear() {
    if (confirm("Clear all completed task history?")) {
      setHistory([]);
    }
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 text-zinc-500 mt-8">
        <span className="text-5xl">📭</span>
        <p className="text-lg">No completed tasks yet.</p>
        <p className="text-sm">Tasks you complete will appear here.</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-lg flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-zinc-400 text-sm">{history.length} task{history.length !== 1 ? "s" : ""} completed</p>
        <button
          onClick={handleClear}
          className="text-xs text-zinc-600 hover:text-red-400 transition-colors duration-200 px-2 py-1 rounded"
        >
          Clear history
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {history.map((task) => (
          <li
            key={`${task.id}-${task.completedAt}`}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 flex flex-col gap-1"
          >
            <span className="text-zinc-100 font-medium text-base leading-snug line-through decoration-zinc-600">
              {task.title}
            </span>
            <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
              <span>{PRIORITY_LABEL[task.priority]}</span>
              <span>·</span>
              <span>✅ {formatDate(task.completedAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
