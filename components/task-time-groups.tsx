'use client'

import { TimeGroup, Task } from '../types/task'
import { TaskTable } from './task-table'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TaskTimeGroupsProps {
  groups: TimeGroup[]
  onTaskClick: (task: Task) => void
  onArchive: (taskId: string) => void
}

export function TaskTimeGroups({
  groups,
  onTaskClick,
  onArchive,
}: TaskTimeGroupsProps) {
  const [openGroups, setOpenGroups] = useState<string[]>(groups.map(g => g.title))

  const toggleGroup = (title: string) => {
    setOpenGroups(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <div className="space-y-4">
      {groups.map(group => (
        <div key={group.title}>
          <button
            onClick={() => toggleGroup(group.title)}
            className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-50"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openGroups.includes(group.title) ? 'transform rotate-0' : 'transform -rotate-90'
              }`}
            />
            <span className="font-medium">{group.title}</span>
            <span className="text-sm text-gray-500">{group.count}</span>
          </button>
          <AnimatePresence>
            {openGroups.includes(group.title) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TaskTable
                  tasks={group.tasks}
                  onTaskClick={onTaskClick}
                  onArchive={onArchive}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

