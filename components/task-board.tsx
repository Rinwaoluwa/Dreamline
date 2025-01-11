'use client'

import { useState, useCallback } from 'react'
import { Task, Column, Status, View } from '../types/task'
import { TaskColumn } from './task-column'
import { TaskDetailSidebar } from './task-detail-sidebar'
import { TaskTable } from './task-table'
import { TaskTimeGroups } from './task-time-groups'
import { NewTaskDialog } from './new-task-dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutGrid, AlertCircle, CalendarDays, LayoutList, Archive } from 'lucide-react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { TaskCard } from './task-card'
import { groupTasksByDate } from '../utils/date'
import CTA from './cta'
import * as React from "react"


const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Buy groceries',
    dueDate: 'December 29, 2024',
    priority: 'Medium',
    status: 'todo',
    completed: false,
    notes: 'Focus on items for meal prep; avoid snacks.',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Complete reading assignment',
    dueDate: 'January 6, 2025',
    priority: 'Medium',
    status: 'todo',
    completed: false,
    notes: '',
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    title: 'Submit monthly report',
    dueDate: 'December 30, 2024',
    priority: 'High',
    status: 'in-progress',
    completed: false,
    notes: '',
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    title: 'Submit group project',
    dueDate: 'January 2, 2025',
    priority: 'High',
    status: 'in-progress',
    completed: false,
    notes: '',
    createdAt: '2024-01-01'
  },
  {
    id: '5',
    title: 'Organize team files',
    dueDate: 'December 28, 2024',
    priority: 'High',
    status: 'done',
    completed: true,
    notes: '',
    createdAt: '2024-01-01'
  }
]

export function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [currentView, setCurrentView] = useState<View>('kanban')
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleArchive = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { 
            ...task,
            status: task.status === 'archived' ? 'todo' : 'archived',
            completed: task.status !== 'archived', // Set completed false when unarchiving
            priority: task.status === 'archived' ? task.priority : task.priority // Maintain priority
          }
        : task
    ))
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    // If dropped outside valid target
    if (!over || !over.id) {
      return // This will trigger animation back to original position
    }

    const activeTaskId = active.id
    const activeTask = tasks.find(task => task.id === activeTaskId)
    const newStatus = over.id as Status

    // Validate column and update if valid
    if (activeTask && ['todo', 'in-progress', 'done'].includes(newStatus)) {
      setTasks(prev => 
        prev.map(task => 
          task.id === activeTaskId
            ? { ...task, status: newStatus }
            : task
        )
      )
    }
  }

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, task])
  }

  const handleClickOutside = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedTask(null)
    }
  }, [])

  const columns: Column[] = [
    {
      id: 'todo',
      title: 'To-Do',
      count: tasks.filter(t => t.status === 'todo').length,
      tasks: tasks.filter(t => t.status === 'todo')
    },
    {
      id: 'in-progress',
      title: 'In progress',
      count: tasks.filter(t => t.status === 'in-progress').length,
      tasks: tasks.filter(t => t.status === 'in-progress')
    },
    {
      id: 'done',
      title: 'Done',
      count: tasks.filter(t => t.status === 'done').length,
      tasks: tasks.filter(t => t.status === 'done')
    }
  ]

  const renderContent = () => {
    const activeTasks = tasks.filter(t => t.status !== 'archived')
    const archivedTasks = tasks.filter(t => t.status === 'archived')
    const highPriorityTasks = activeTasks.filter(t => t.priority === 'High')
    const timeGroups = groupTasksByDate(activeTasks)

    switch (currentView) {
      case 'kanban':
        return (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-6 overflow-x-auto pb-4">
              {columns.map(column => (
                <TaskColumn
                  key={column.id}
                  column={column}
                  onArchive={handleArchive}
                />
              ))}
            </div>
            <DragOverlay>
              {activeId ? (
                <TaskCard
                  task={tasks.find(t => t.id === activeId)!}
                  onArchive={handleArchive}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        )
      case 'priority':
        return (
          <TaskTable
            tasks={highPriorityTasks}
            onTaskClick={setSelectedTask}
            onArchive={handleArchive}
          />
        )
      case 'next7':
        return (
          <TaskTimeGroups
            groups={timeGroups}
            onTaskClick={setSelectedTask}
            onArchive={handleArchive}
          />
        )
      case 'all':
        return (
          <TaskTable
            tasks={activeTasks}
            onTaskClick={setSelectedTask}
            onArchive={handleArchive}
          />
        )
      case 'archive':
        return (
          <TaskTable
            tasks={archivedTasks}
            onTaskClick={setSelectedTask}
            onArchive={handleArchive}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <CTA />
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dream List</h1>
          <NewTaskDialog onAddTask={handleAddTask} />
        </div>
        <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as View)}>
          <div className="relative">
            <TabsList className="w-full justify-start overflow-x-auto scrollbar-hide flex whitespace-nowrap">
              <TabsTrigger value="kanban" className="data-[state=active]:bg-gray-100">
                <LayoutGrid className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Kanban</span>
              </TabsTrigger>
              <TabsTrigger value="priority" className="data-[state=active]:bg-gray-100">
                <AlertCircle className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">High Priority Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="next7" className="data-[state=active]:bg-gray-100">
                <CalendarDays className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Next 7 Days</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-100">
                <LayoutList className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="archive" className="data-[state=active]:bg-gray-100">
                <Archive className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Archive</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
      {renderContent()}
      <div
        className={`fixed inset-0 bg-black/20 transition-opacity ${
          selectedTask ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClickOutside}
      >
        <TaskDetailSidebar
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      </div>
    </div>
  )
}

