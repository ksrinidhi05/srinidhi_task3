"use client"

import { TaskItem } from "./task-item"
import type { Task } from "@/app/page"

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onDeleteTask: (id: string) => void
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
        <p className="text-slate-600">No tasks found. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3" role="list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  )
}
