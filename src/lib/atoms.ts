import { atomWithStorage } from "jotai/utils";
import type { Task, CompletedTask } from "@/lib/types";

/**
 * The ordered list of tasks.
 * - tasks[0] is always the active/visible task.
 * - "urgent" and "high" priority tasks sort ahead of "normal" ones
 *   so they can skip the queue.
 */
export const tasksAtom = atomWithStorage<Task[]>("adhd-tasks", []);

/**
 * Log of all completed tasks, most recent first.
 * Each entry is the original task plus a `completedAt` timestamp.
 */
export const historyAtom = atomWithStorage<CompletedTask[]>("adhd-history", []);
