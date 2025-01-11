import { Task } from '../types/task'

export function isWithinDays(date: string, days: number): boolean {
  const taskDate = new Date(date)
  const now = new Date()
  const diffTime = taskDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays >= 0 && diffDays <= days
}

export function groupTasksByDate(tasks: Task[]) {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  const groups = [
    {
      title: 'Last 30 days',
      tasks: tasks.filter(task => {
        const taskDate = new Date(task.dueDate)
        const diffTime = now.getTime() - taskDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 30 && diffDays > 1
      })
    },
    {
      title: 'Yesterday',
      tasks: tasks.filter(task => {
        const taskDate = new Date(task.dueDate)
        return taskDate.toDateString() === yesterday.toDateString()
      })
    },
    {
      title: 'Next 7 days',
      tasks: tasks.filter(task => isWithinDays(task.dueDate, 7))
    }
  ]

  return groups.filter(group => group.tasks.length > 0).map(group => ({
    ...group,
    count: group.tasks.length
  }))
}

