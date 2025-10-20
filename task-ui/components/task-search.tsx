"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface TaskSearchProps {
  value: string
  onChange: (value: string) => void
}

export function TaskSearch({ value, onChange }: TaskSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <Input
        placeholder="Search tasks by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        aria-label="Search tasks by name"
      />
    </div>
  )
}
