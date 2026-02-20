import { TaskCard } from "@/components/TaskCard";
import { AddTask } from "@/components/AddTask";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16 gap-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Focus</h1>
        <p className="text-zinc-500 text-sm mt-1">One task at a time.</p>
      </header>

      <TaskCard />
      <AddTask />
    </main>
  );
}
