'use client'

import { Task } from '../types/task'
import { PriorityBadge } from './priority-badge'
import { Archive, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TaskTableProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
  onArchive: (taskId: string) => void
}

export function TaskTable({
  tasks,
  onTaskClick,
  onArchive,
}: TaskTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[700px] lg:min-w-full">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-2 sm:gap-4 px-2 sm:px-4 py-2 text-sm text-gray-500 border-b">
          <div className="w-6"></div>
          <div>Task Name</div>
          <div>Priority</div>
          <div>Deadline</div>
          <div>Status</div>
          <div className="w-8"></div>
        </div>
        <div className="divide-y">
          {tasks.map(task => (
            <div
              key={task.id}
              className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-2 sm:gap-4 px-2 sm:px-4 py-3 items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => onTaskClick(task)}
            >
              <div className="w-6">
              🎯
              </div>
              <div className="font-medium">{task.title}</div>
              <div>
                <PriorityBadge priority={task.priority} />
              </div>
              <div className="text-gray-600">{task.dueDate}</div>
              <div>
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-sm ${
                    task.status === 'todo'
                      ? 'bg-gray-100 text-gray-700'
                      : task.status === 'in-progress'
                      ? 'bg-blue-50 text-blue-700'
                      : task.status === 'done'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {task.status === 'todo'
                    ? 'To-Do'
                    : task.status === 'in-progress'
                    ? 'In Progress'
                    : task.status === 'done'
                    ? 'Done'
                    : 'Archived'}
                </span>
              </div>
              <div className="w-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation()
                        onArchive(task.id)
                      }}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      {task.status === 'archived' ? 'Unarchive' : 'Archive'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

