"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { tasksAtom } from "@/lib/atoms";
import { formatDeadline } from "@/lib/utils";
import { TaskControls } from "@/components/TaskControls";

const PRIORITY_STYLES = {
  urgent: "bg-red-500/20 text-red-400 border-red-500/40",
  high: "bg-amber-500/20 text-amber-400 border-amber-500/40",
  normal: "bg-zinc-700/50 text-zinc-400 border-zinc-600/40",
};

const PRIORITY_LABELS = {
  urgent: "🔥 Urgent",
  high: "⚡ High",
  normal: "Normal",
};

export function TaskCard() {
  const [tasks] = useAtom(tasksAtom);
  const task = tasks[0];

  // Capture 'now' once on mount — stable across re-renders (must be before early return)
  const [now] = useState(Date.now);

  if (!task) {
    return (
      <div className="flex flex-col items-center gap-3 text-center py-20">
        <span className="text-7xl">✅</span>
        <p className="text-2xl font-semibold text-zinc-300 mt-2">All clear!</p>
        <p className="text-zinc-500 text-sm">Add a task below to get started.</p>
      </div>
    );
  }

  const isOverdue = task.deadline != null && task.deadline < now;
  const isDueSoon =
    task.deadline != null &&
    !isOverdue &&
    task.deadline - now < 24 * 60 * 60 * 1000;

  return (
    <section className="w-full max-w-lg flex flex-col gap-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-5 shadow-2xl">
        {/* Header row: priority badge + deadline */}
        <div className="flex items-center justify-between gap-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${PRIORITY_STYLES[task.priority]}`}
          >
            {PRIORITY_LABELS[task.priority]}
          </span>

          {task.deadline != null && (
            <span
              className={`text-xs font-medium flex items-center gap-1 ${
                isOverdue
                  ? "text-red-400"
                  : isDueSoon
                    ? "text-amber-400"
                    : "text-zinc-500"
              }`}
            >
              {isOverdue ? "⚠️ Overdue" : isDueSoon ? "⏰ Due soon" : "📅"}{" "}
              {formatDeadline(task.deadline)}
            </span>
          )}
        </div>

        {/* Task title */}
        <p className="text-3xl font-bold text-zinc-100 leading-snug">
          {task.title}
        </p>

        {/* Queue depth */}
        {tasks.length > 1 && (
          <p className="text-zinc-600 text-sm">
            {tasks.length - 1} more task{tasks.length - 1 !== 1 ? "s" : ""}{" "}
            waiting
          </p>
        )}
      </div>

      <TaskControls />
    </section>
  );
}
