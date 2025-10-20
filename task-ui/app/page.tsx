"use client"

import { useState } from "react"
import { TaskHeader } from "@/components/task-header"
import { TaskForm } from "@/components/task-form"
import { TaskTable } from "@/components/task-table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export interface TaskExecution {
  startTime: string
  endTime: string
  output: string
}

export interface Task {
  id: string
  name: string
  owner: string
  command: string
  taskExecutions: TaskExecution[]
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Print Hello",
      owner: "John Smith",
      command: "echo Hello World!",
      taskExecutions: [
        {
          startTime: "2025-10-20 10:30:00",
          endTime: "2025-10-20 10:30:01",
          output: "Hello World!",
        },
      ],
    },
    {
      id: "2",
      name: "List Files",
      owner: "Jane Doe",
      command: "ls -la",
      taskExecutions: [],
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const addTask = (task: Omit<Task, "id" | "taskExecutions">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      taskExecutions: [],
    }
    setTasks([newTask, ...tasks])
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTaskExecution = (taskId: string, execution: TaskExecution) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, taskExecutions: [...task.taskExecutions, execution] } : task,
      ),
    )
  }

  const filteredTasks = searchQuery
    ? tasks.filter((task) => task.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : tasks

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <TaskHeader taskCount={tasks.length} />

        <div className="mt-8 space-y-6">
          {/* Create Task Form */}
          <TaskForm onAddTask={addTask} />

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search tasks by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search tasks by name"
            />
          </div>

          {/* Tasks Table */}
          <TaskTable tasks={filteredTasks} onDeleteTask={deleteTask} onAddExecution={addTaskExecution} />
        </div>
      </div>
    </main>
  )
}
