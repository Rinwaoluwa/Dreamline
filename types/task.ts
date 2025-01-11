export type Priority = 'Low' | 'Medium' | 'High'
export type Status = 'todo' | 'in-progress' | 'done' | 'archived'
export type View = 'kanban' | 'priority' | 'next7' | 'all' | 'archive'

export interface Task {
  id: string
  title: string
  dueDate: string
  priority: Priority
  status: Status
  completed: boolean
  notes?: string
  createdAt: string
}

export interface Column {
  id: Status
  title: string
  count: number
  tasks: Task[]
}

export interface TimeGroup {
  title: string
  count: number
  tasks: Task[]
}

