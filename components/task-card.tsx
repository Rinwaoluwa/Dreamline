'use client'

import { motion } from 'framer-motion'
import { Task } from '../types/task'
import { PriorityBadge } from './priority-badge'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Archive } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TaskCardProps {
  task: Task
  onArchive: (id: string) => void
}

export function TaskCard({ task, onArchive }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative p-4 bg-white rounded-lg space-y-3 transition-all duration-200 ${isDragging
          ? 'shadow-lg ring-2 ring-primary/20 rotate-2'
          : 'shadow-[0px_0px_0px_1px_rgba(15,15,15,0.07),0px_2px_4px_rgba(15,15,15,0.05)]'
        }`}
    >
      <div className="flex items-start gap-3">
        {task.status === 'todo' && "🕒"}
        {task.status === 'in-progress' && "⏳"}
        {task.status === 'done' && "🏆"}

        <div className="flex-1 space-y-1">
          <h3 className="font-medium text-sm">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.dueDate}</p>
        </div>
      </div>
      <div className="flex items-center justify-between relative z-10">
        <PriorityBadge priority={task.priority} />
        <Button
          variant="ghost"
          size="icon"
          className="relative z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            onArchive(task.id)
          }}
        >
          <Archive className="h-4 w-4" />
        </Button>
      </div>
      <motion.div
        className="absolute inset-0 rounded-lg bg-primary/5 z-0"
        initial={false}
        animate={{ opacity: isDragging ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

