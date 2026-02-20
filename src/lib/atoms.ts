import { atomWithStorage } from "jotai/utils";
import type { Task } from "@/lib/types";

/**
 * The ordered list of tasks.
 * - tasks[0] is always the active/visible task.
 * - "urgent" and "high" priority tasks sort ahead of "normal" ones
 *   so they can skip the queue.
 */
export const tasksAtom = atomWithStorage<Task[]>("adhd-tasks", []);
