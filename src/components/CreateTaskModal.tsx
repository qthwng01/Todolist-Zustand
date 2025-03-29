import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { format, parse } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

// -------------------- //

import { useModalStore } from '@/store/ModalStore'
import { useTaskStore } from '@/store/TaskStore'
import { taskSchema } from '@/schema'
import { categoryEnum } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type formValues = z.infer<typeof taskSchema>

const CreateTaskModal = () => {
  const { openModal, setOpenModal } = useModalStore()
  const { addTask } = useTaskStore()

  const form = useForm<formValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskname: 'Learning Zustand 2',
      category: 'Study',
      date: '',
      description: 'Learning Zustand 223',
    },
  })

  const onSubmit = (values: formValues) => {
    addTask({
      id: crypto.randomUUID(),
      taskname: values.taskname,
      description: values.description,
      category: values.category,
      date: values.date,
      state: 'open',
    })
    setOpenModal(false)
    form.reset()
  }

  // Hàm xử lý khi chọn ngày từ Calendar
  const handleSelectDate = (
    date: Date | undefined,
    onChange: (value: string) => void
  ) => {
    onChange(date ? format(date, 'yyyy-MM-dd') : '')
  }

  // Format date
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return format(date, 'dd-MM-yyyy')
  }

  // Check date
  const checkDates = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Handle open/close modal
  const handleOpenChange = (open: boolean) => {
    if (!open) form.reset()
    setOpenModal(open)
  }

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription aria-describedby={undefined} />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Task name */}
            <FormField
              control={form.control}
              name="taskname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryEnum.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            formatDisplayDate(field.value)
                          ) : (
                            <span>Pick a date...</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value
                            ? parse(field.value, 'dd-MM-yyyy', new Date())
                            : undefined
                        }
                        onSelect={(date) =>
                          handleSelectDate(date, field.onChange)
                        }
                        disabled={checkDates}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Some..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-md bg-blue-400 hover:bg-blue-500"
            >
              Create Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskModal
