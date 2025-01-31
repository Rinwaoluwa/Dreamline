import { FC } from 'react'
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className={cn("animate-spin h-6 w-6", className)} role="status">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}