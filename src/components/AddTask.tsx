"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { tasksAtom } from "@/lib/atoms";
import { insertByPriority } from "@/lib/utils";
import type { Priority } from "@/lib/types";

export function AddTask() {
  const [, setTasks] = useAtom(tasksAtom);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setTasks((prev) =>
      insertByPriority(prev, {
        id: crypto.randomUUID(),
        title: title.trim(),
        createdAt: Date.now(),
        priority,
        deadline: deadline ? new Date(deadline).getTime() : undefined,
      })
    );

    setTitle("");
    setPriority("normal");
    setDeadline("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full max-w-lg py-3 rounded-xl border border-dashed border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium"
      >
        + Add task
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-5 shadow-xl"
    >
      {/* Title */}
      <input
        autoFocus
        type="text"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-transparent text-zinc-100 text-xl font-semibold placeholder:text-zinc-600 outline-none border-b border-zinc-700 pb-3 focus:border-zinc-400 transition-colors"
      />

      {/* Priority + Deadline row */}
      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="bg-zinc-800 text-zinc-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-500 cursor-pointer"
          >
            <option value="normal">Normal</option>
            <option value="high">⚡ High</option>
            <option value="urgent">🔥 Urgent</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="bg-zinc-800 text-zinc-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex-1 py-2.5 rounded-xl bg-zinc-100 text-zinc-900 font-semibold text-sm hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add task
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-400 font-semibold text-sm hover:bg-zinc-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
