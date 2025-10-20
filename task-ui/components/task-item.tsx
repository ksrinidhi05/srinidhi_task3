"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { Task } from "@/app/page"

interface TaskItemProps {
  task: Task
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onDeleteTask: (id: string) => void
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

const statusColors = {
  todo: "border-slate-200",
  "in-progress": "border-blue-200 bg-blue-50",
  completed: "border-green-200 bg-green-50",
}

export function TaskItem({ task, onUpdateTask, onDeleteTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleStatusChange = (newStatus: string) => {
    onUpdateTask(task.id, { status: newStatus as Task["status"] })
  }

  const handlePriorityChange = (newPriority: string) => {
    onUpdateTask(task.id, { priority: newPriority as Task["priority"] })
  }

  const isCompleted = task.status === "completed"

  return (
    <article
      className={`flex items-start gap-4 rounded-lg border-2 p-4 transition-all ${statusColors[task.status]}`}
      role="listitem"
    >
      {/* Checkbox */}
      <div className="mt-1 flex-shrink-0">
        <Checkbox
          id={`task-${task.id}`}
          checked={isCompleted}
          onCheckedChange={(checked) => {
            onUpdateTask(task.id, {
              status: checked ? "completed" : "todo",
            })
          }}
          aria-label={`Mark "${task.title}" as ${isCompleted ? "incomplete" : "complete"}`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className={`text-base font-semibold ${isCompleted ? "line-through text-slate-500" : "text-slate-900"}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${isCompleted ? "text-slate-400" : "text-slate-600"}`}>{task.description}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[task.priority]}`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>

          {task.dueDate && (
            <span className="text-xs text-slate-600">
              Due: {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-shrink-0 gap-2">
        <Select value={task.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-32 text-xs" aria-label={`Change status for "${task.title}"`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteTask(task.id)}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          aria-label={`Delete "${task.title}"`}
        >
          Delete
        </Button>
      </div>
    </article>
  )
}
