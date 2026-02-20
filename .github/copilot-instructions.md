# Copilot Instructions – ADHD Todo List

## Project Overview
A focused todo list web application designed specifically for people with ADHD.
The core UX principle is **radical simplicity**: only show the user **one task at a time** — the first item in the list.
This reduces overwhelm, decision fatigue, and distraction.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode preferred)
- **State Management**: Jotai (atomic state, no Redux/Context boilerplate)
- **Styling**: Tailwind CSS v4
- **Font**: `geist` npm package (`GeistSans`) — do NOT use `next/font/google`
- **Package Manager**: npm

## Core UX Principles
- **Show only the first task** in the list at any given time — never display multiple tasks simultaneously
- Tasks can be added, completed (which removes them and advances the next), and reordered
- UI should be calm, minimal, and distraction-free
- Large, readable fonts with plenty of whitespace
- Animations for dopamine hits when completing tasks (e.g., confetti, checkmark, etc.)
- Mobile-first design

## Architecture & Conventions
- Use the **App Router** (`app/` directory) — no `pages/` directory
- Prefer **React Server Components** by default; only add `"use client"` when interactivity is needed
- Use **Jotai atoms** in a dedicated `lib/atoms.ts` (or `lib/store.ts`) file for all global state
- Keep components small and focused — one responsibility per component
- Style components using **Tailwind CSS utility classes** directly in JSX — no separate CSS Module files
- Use `@/` path alias for all imports (e.g., `@/lib/atoms`, `@/components/TaskCard`)

## File Structure
```
app/
  layout.tsx        # Root layout
  page.tsx          # Home page – shows the single current task
  providers.tsx     # Jotai <Provider> wrapper
components/
  TaskCard.tsx      # Displays the single current task
  AddTask.tsx       # Input to add a new task
  TaskControls.tsx  # Complete / skip / reorder controls
lib/
  atoms.ts          # All Jotai atoms (task list, etc.)
  types.ts          # Shared TypeScript types (Task, etc.)
  utils.ts          # insertByPriority, formatDeadline helpers
```

## Data Model
```ts
// lib/types.ts
export type Priority = "normal" | "high" | "urgent";

export type Task = {
  id: string;        // uuid or nanoid
  title: string;
  createdAt: number; // Date.now()
  priority: Priority;
  deadline?: number; // Date.now() timestamp — optional
};
```

## State (Jotai)
- `tasksAtom` — `atomWithStorage<Task[]>("adhd-tasks", [])` — the ordered list of tasks, persisted to localStorage
- The **first item** (`tasks[0]`) is always the active/visible task
- Completing a task removes it from index 0, surfacing the next
- `deadline` is an optional timestamp; surface urgency cues when a deadline is approaching or overdue

## Priority Queue Order
Effective rank (lower = higher priority), implemented in `lib/utils.ts`:
1. `urgent` — always first, regardless of deadline
2. Due today — any non-urgent task whose `deadline` falls on today's date
3. `high` — no deadline or future deadline
4. `normal` — no deadline or future deadline

`insertByPriority(tasks, newTask)` inserts a new task at the correct position based on this rank.

## Deployment
- Target: **GitHub Pages** (static export) at `https://alexandergrxnt.github.io/adhd-todo-list/`
- `next.config.ts` uses `output: "export"`, `basePath: "/adhd-todo-list"`, `assetPrefix: "/adhd-todo-list"`
- Do NOT introduce API routes, `getServerSideProps`, or any server-side features — they are incompatible with static export
- CI/CD: `.github/workflows/deploy.yml` builds and deploys `out/` to GitHub Pages on every push to `main`

## Development Workflow
- Always work on a `feature/*` or `fix/*` branch — never commit directly to `main`
- Commit after each logical unit of work (e.g. types, component, tests) — not one giant commit per feature
- Run `npm run build` to verify the build passes before considering a task complete
- Keep each session scoped to a single feature — start a new chat for a new feature

## Do's
- Keep the UI laser-focused on the current task
- Persist tasks to `localStorage` using Jotai's `atomWithStorage` from `jotai/utils`
- Use semantic HTML (`<main>`, `<section>`, `<button>`, etc.)
- Write TypeScript types for all props and state

## Don'ts
- Do NOT show multiple tasks at once
- Do NOT add complex dashboards, charts, or statistics
- Do NOT use CSS Modules or plain CSS files for component styling (use Tailwind utilities instead)
- Do NOT use the `pages/` directory
- Do NOT add unnecessary third-party dependencies
