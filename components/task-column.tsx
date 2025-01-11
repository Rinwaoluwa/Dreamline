'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Column } from '../types/task'
import { TaskCard } from './task-card'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface TaskColumnProps {
  column: Column
  onArchive: (taskId: string) => void
}

export function TaskColumn({ column, onArchive }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  const getColumnStyles = () => {
    switch (column.id) {
      case 'todo':
        return {
          dotColor: 'rgb(50, 48, 44)',
          textContainer: 'rgb(227, 226, 224)',
          containerBg: 'rgba(249, 249, 245, 0.5)',
          textColor: 'rgb(50, 48, 44)'
        }
      case 'in-progress':
        return {
          dotColor: 'rgb(24, 51, 71)',
          textContainer: 'rgb(211, 229, 239)',
          containerBg: 'rgba(241, 248, 251, 0.7)',
          textColor: 'rgb(24, 51, 71)'
        }
      case 'done':
        return {
          dotColor: 'rgb(28, 56, 41)',
          textContainer: 'rgb(219, 237, 219)',
          containerBg: 'rgba(244, 248, 243, 0.7)',
          textColor: 'rgb(28, 56, 41)'
        }
      default:
        return {
          dotColor: 'rgb(50, 48, 44)',
          textContainer: 'rgb(227, 226, 224)',
          containerBg: 'rgba(249, 249, 245, 0.5)',
          textColor: 'rgb(50, 48, 44)'
        }
    }
  }

  const styles = getColumnStyles()

  return (
    <motion.div 
      className="flex-1 min-w-[300px] max-w-[350px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4 px-3">
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ backgroundColor: styles.textContainer }}
        >
          <div 
            className={`w-2 h-2 rounded-full`}
            style={{ backgroundColor: styles.dotColor }}
          />
          <h2 
            className="text-sm font-medium" 
            style={{ color: styles.textColor }}
          >
            {column.title}
          </h2>
          <span 
            className="text-sm" 
            style={{ color: styles.textColor }}
          >
            {column.count}
          </span>
        </div>
      </div>
      <motion.div
        ref={setNodeRef}
        layout
        className="space-y-3 p-2 rounded-lg min-h-[200px]"
        style={{ backgroundColor: styles.containerBg }}
      >
        <SortableContext
          items={column.tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence mode="popLayout">
            {column.tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onArchive={onArchive}
              />
            ))}
          </AnimatePresence>
        </SortableContext>
      </motion.div>
    </motion.div>
  )
}

