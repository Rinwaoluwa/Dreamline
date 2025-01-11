import { Priority } from "@/types/task"

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const colors = {
    Low: {
      bg: 'rgb(219, 237, 219)',
      text: 'rgb(28, 56, 41)',
      container: 'rgba(244, 248, 243, 0.7)'
    },
    Medium: {
      bg: 'rgb(255, 242, 204)',
      text: 'rgb(64, 44, 27)',
      container: 'rgba(254, 251, 243, 0.7)'
    },
    High: {
      bg: 'rgb(255, 223, 223)',
      text: 'rgb(93, 23, 21)',
      container: 'rgba(253, 244, 244, 0.7)'
    }
  }

  const style = colors[priority]

  return (
    <span 
      className="px-2 py-1 rounded text-xs"
      style={{ 
        backgroundColor: style.bg,
        color: style.text
      }}
    >
      {priority}
    </span>
  )
}

