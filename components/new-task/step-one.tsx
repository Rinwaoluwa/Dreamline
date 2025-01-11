import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface StepOneProps {
  title: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function StepOne({ title, onChange }: StepOneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="space-y-4"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label htmlFor="title" className="text-sm font-medium text-gray-700">
          Task Title
        </Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Enter task title"
          required
          autoFocus
        />
      </motion.div>
    </motion.div>
  )
}