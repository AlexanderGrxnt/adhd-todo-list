import type { Task } from "@/lib/types";

/**
 * Effective priority rank (lower = higher priority):
 *   0 — urgent (always first, deadline irrelevant)
 *   1 — due today (non-urgent tasks whose deadline falls on today's date)
 *   2 — high
 *   3 — normal
 */
function isDeadlineToday(timestamp: number): boolean {
  const d = new Date(timestamp);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function getEffectiveRank(task: Task): number {
  if (task.priority === "urgent") return 0;
  if (task.deadline != null && isDeadlineToday(task.deadline)) return 1;
  if (task.priority === "high") return 2;
  return 3;
}

/**
 * Inserts a task into the list respecting effective priority order:
 *   urgent → due today → high → normal
 */
export function insertByPriority(tasks: Task[], newTask: Task): Task[] {
  const rank = getEffectiveRank(newTask);
  const insertIndex = tasks.findIndex((t) => getEffectiveRank(t) > rank);
  if (insertIndex === -1) return [...tasks, newTask];
  return [
    ...tasks.slice(0, insertIndex),
    newTask,
    ...tasks.slice(insertIndex),
  ];
}

export function formatDeadline(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year:
      new Date(timestamp).getFullYear() !== new Date().getFullYear()
        ? "numeric"
        : undefined,
  });
}
