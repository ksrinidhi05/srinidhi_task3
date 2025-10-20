"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Task } from "@/app/page"
import { Plus } from "lucide-react"

interface TaskFormProps {
  onAddTask: (task: Omit<Task, "id" | "taskExecutions">) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [owner, setOwner] = useState("")
  const [command, setCommand] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !owner.trim() || !command.trim()) {
      alert("Please fill in all required fields")
      return
    }

    onAddTask({
      name: name.trim(),
      owner: owner.trim(),
      command: command.trim(),
    })

    // Reset form
    setName("")
    setOwner("")
    setCommand("")
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 gap-2" size="lg">
        <Plus className="h-5 w-5" />
        Create New Task
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Create New Task</h2>

      <div>
        <label htmlFor="task-name" className="block text-sm font-medium text-slate-900">
          Task Name{" "}
          <span className="text-red-500" aria-label="required">
            *
          </span>
        </label>
        <Input
          id="task-name"
          placeholder="e.g., Print Hello"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="task-owner" className="block text-sm font-medium text-slate-900">
          Owner{" "}
          <span className="text-red-500" aria-label="required">
            *
          </span>
        </label>
        <Input
          id="task-owner"
          placeholder="e.g., John Smith"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="mt-1"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="task-command" className="block text-sm font-medium text-slate-900">
          Shell Command{" "}
          <span className="text-red-500" aria-label="required">
            *
          </span>
        </label>
        <Textarea
          id="task-command"
          placeholder="e.g., echo Hello World!"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="mt-1 font-mono text-sm"
          rows={3}
          required
          aria-required="true"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
          Create Task
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsOpen(false)
            setName("")
            setOwner("")
            setCommand("")
          }}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
