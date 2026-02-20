"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { tasksAtom } from "@/lib/atoms";
import { insertByPriority } from "@/lib/utils";

export function TaskControls() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [completing, setCompleting] = useState(false);

  if (tasks.length === 0) return null;

  function handleComplete() {
    setCompleting(true);
    // Brief animation delay before removing the task
    setTimeout(() => {
      setTasks((prev) => prev.slice(1));
      setCompleting(false);
    }, 600);
  }

  function handleSkip() {
    setTasks((prev) => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      // Re-insert the skipped task respecting priority order, but after
      // same-priority tasks so it doesn't immediately jump back to front.
      return insertByPriority(rest, { ...first, priority: "normal" });
    });
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleComplete}
        disabled={completing}
        className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
          completing
            ? "bg-green-500 text-white scale-95 opacity-80"
            : "bg-green-600 hover:bg-green-500 active:scale-95 text-white"
        }`}
      >
        {completing ? "✅ Done!" : "Complete"}
      </button>

      {tasks.length > 1 && (
        <button
          onClick={handleSkip}
          className="px-6 py-4 rounded-xl font-semibold text-lg bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 transition-all duration-200"
        >
          Skip
        </button>
      )}
    </div>
  );
}
