'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Task } from '../types/task'
import { PriorityBadge } from './priority-badge'
import { X, Calendar, AlertCircle, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TaskDetailSidebarProps {
  task: Task | null
  onClose: () => void
}

export function TaskDetailSidebar({ task, onClose }: TaskDetailSidebarProps) {
  if (!task) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed inset-y-0 right-0 w-[400px] bg-white border-l border-gray-200 shadow-lg"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Priority
              </div>
              <PriorityBadge priority={task.priority} />
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Deadline
              </div>
              <p className="text-sm">{task.dueDate}</p>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Status
              </div>
              <div className={`inline-flex px-2 py-1 rounded-full text-sm ${
                task.status === 'todo' ? 'bg-gray-100 text-gray-700' :
                task.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                'bg-green-50 text-green-700'
              }`}>
                {task.status === 'todo' ? 'To-Do' :
                 task.status === 'in-progress' ? 'In Progress' :
                 'Done'}
              </div>
            </div>
            
            {task.notes && (
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Notes</div>
                <p className="text-sm">{task.notes}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

