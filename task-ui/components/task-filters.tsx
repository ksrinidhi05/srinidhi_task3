"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, ListTodo } from "lucide-react"

interface TaskFiltersProps {
  currentFilter: "all" | "todo" | "in-progress" | "completed"
  onFilterChange: (filter: "all" | "todo" | "in-progress" | "completed") => void
  taskCount: number
}

export function TaskFilters({ currentFilter, onFilterChange, taskCount }: TaskFiltersProps) {
  const filters = [
    { value: "all" as const, label: "All Tasks", icon: ListTodo },
    { value: "todo" as const, label: "To Do", icon: Circle },
    { value: "in-progress" as const, label: "In Progress", icon: Clock },
    { value: "completed" as const, label: "Completed", icon: CheckCircle2 },
  ]

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter tasks">
        {filters.map((filter) => {
          const Icon = filter.icon
          const isActive = currentFilter === filter.value
          return (
            <Button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              variant={isActive ? "default" : "outline"}
              className={`gap-2 transition-all ${
                isActive
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "hover:border-blue-300 hover:text-blue-600"
              }`}
              aria-pressed={isActive}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{filter.label}</span>
              <span className="sm:hidden">{filter.label.split(" ")[0]}</span>
            </Button>
          )
        })}
      </div>

      <div className="flex items-center justify-center px-4 py-2 rounded-lg bg-slate-100 text-sm font-medium text-slate-700 whitespace-nowrap">
        {taskCount} {taskCount === 1 ? "task" : "tasks"}
      </div>
    </div>
  )
}
