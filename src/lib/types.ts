export type Priority = "normal" | "high" | "urgent";

export type Task = {
  id: string;        // uuid or nanoid
  title: string;
  createdAt: number; // Date.now()
  priority: Priority;
  deadline?: number; // Date.now() timestamp — optional
};
