import { FC } from 'react'
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const Loading: FC = () => {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <LoadingSpinner className="text-muted-foreground" />
      <p className="ml-2 text-md text-muted-foreground">
          Loading your dreamline...
        </p>
    </div>
  )
}

export default Loading