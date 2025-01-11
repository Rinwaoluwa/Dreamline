import { TaskBoard } from '@/components/task-board'

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskBoard />
      </div>
    </main>
  )
}

