"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Play, ChevronDown, ChevronUp } from "lucide-react"
import type { Task, TaskExecution } from "@/app/page"

interface TaskTableProps {
  tasks: Task[]
  onDeleteTask: (id: string) => void
  onAddExecution: (taskId: string, execution: TaskExecution) => void
}

export function TaskTable({ tasks, onDeleteTask, onAddExecution }: TaskTableProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)
  const [executingTaskId, setExecutingTaskId] = useState<string | null>(null)

  const handleExecuteCommand = async (taskId: string, command: string) => {
    setExecutingTaskId(taskId)
    try {
      // Simulate command execution
      const startTime = new Date().toLocaleString()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const endTime = new Date().toLocaleString()
      const output = `Command executed: ${command}\n\nOutput: Hello from command execution!`

      onAddExecution(taskId, {
        startTime,
        endTime,
        output,
      })
    } catch (error) {
      console.error("Error executing command:", error)
    } finally {
      setExecutingTaskId(null)
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
        <p className="text-slate-600">No tasks found. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Task Header */}
          <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">{task.name}</h3>
              <p className="text-sm text-slate-600">Owner: {task.owner}</p>
              <p className="text-xs text-slate-500 font-mono mt-1 truncate bg-slate-50 p-2 rounded">{task.command}</p>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Button
                size="sm"
                onClick={() => handleExecuteCommand(task.id, task.command)}
                disabled={executingTaskId === task.id}
                className="gap-2 bg-green-600 hover:bg-green-700"
                aria-label={`Execute task: ${task.name}`}
              >
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">Run</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                aria-label={`${expandedTaskId === task.id ? "Collapse" : "Expand"} executions for ${task.name}`}
              >
                {expandedTaskId === task.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDeleteTask(task.id)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                aria-label={`Delete task: ${task.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Executions List */}
          {expandedTaskId === task.id && task.taskExecutions.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-3">
              <h4 className="font-medium text-slate-900 text-sm">Execution History</h4>
              {task.taskExecutions.map((execution, index) => (
                <div key={index} className="rounded border border-slate-200 bg-white p-3 space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Start: {execution.startTime}</span>
                    <span>End: {execution.endTime}</span>
                  </div>
                  <div className="bg-slate-900 text-slate-100 p-2 rounded font-mono text-xs overflow-auto max-h-32">
                    {execution.output}
                  </div>
                </div>
              ))}
            </div>
          )}

          {expandedTaskId === task.id && task.taskExecutions.length === 0 && (
            <div className="border-t border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-600">
              No executions yet. Run the task to see output.
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
