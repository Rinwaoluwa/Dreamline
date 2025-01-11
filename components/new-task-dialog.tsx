'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Status, Priority, Task } from '../types/task'
import { PlusCircle, ArrowRight, Calendar, AlertCircle, ClipboardList, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

interface NewTaskDialogProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void
}

export function NewTaskDialog({ onAddTask }: NewTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    priority: 'Medium' as Priority,
    status: 'todo' as Status,
    notes: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // Prevent form submission
      
      if (step < 3 && isStepComplete(step)) {
        setStep(prev => prev + 1)
      } else if (step === 3 && isStepComplete(step)) {
        handleSubmit(e)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isStepComplete(step)) {
      // Format the date before submitting
      const formattedDate = format(new Date(formData.dueDate), 'MMMM d, yyyy')
      onAddTask({
        ...formData,
        dueDate: formattedDate
      })
      setOpen(false)
      setStep(1)
      setFormData({
        title: '',
        dueDate: '',
        priority: 'Medium',
        status: 'todo',
        notes: ''
      })
    }
  }

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.title.trim() !== ''
      case 2:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error TODO
        return formData.dueDate !== '' && formData.priority !== ''
      case 3:
        return true // Always allow to proceed from step 3
      default:
        return false
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2 bg-black text-white">
          <PlusCircle className="h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                        Task Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Due Date
                      </Label>
                      <Input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="px-4"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Priority
                      </Label>
                      <RadioGroup
                        defaultValue={formData.priority}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as Priority }))}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Low" id="low" />
                          <Label htmlFor="low">Low</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Medium" id="medium" />
                          <Label htmlFor="medium">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="High" id="high" />
                          <Label htmlFor="high">High</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        Status
                      </Label>
                      <Select
                        name="status"
                        defaultValue={formData.status}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Status }))}
                      >
                        <SelectTrigger className='bg-white'>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="todo" className="hover:bg-gray-100">To-Do</SelectItem>
                          <SelectItem value="in-progress" className="hover:bg-gray-100">In Progress</SelectItem>
                          <SelectItem value="done" className="hover:bg-gray-100">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Add any additional notes here"
                        className="h-24"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div 
            className="flex justify-between pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!isStepComplete(step)}
                className="ml-auto bg-black text-white"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="ml-auto bg-black text-white">
                Create Task
              </Button>
            )}
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

