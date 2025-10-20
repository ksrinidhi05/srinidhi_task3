import { Command } from "lucide-react"

interface TaskHeaderProps {
  taskCount: number
}

export function TaskHeader({ taskCount }: TaskHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
          <Command className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Task Manager</h1>
          <p className="text-sm text-slate-600">Manage and execute shell commands</p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 w-fit">
        <span className="text-sm font-medium text-slate-700">Total Tasks:</span>
        <span className="text-lg font-bold text-blue-600">{taskCount}</span>
      </div>
    </header>
  )
}
