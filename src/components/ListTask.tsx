import { useState } from 'react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Plus, ClipboardList, Trash2 } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useModalStore } from '@/store/ModalStore'
import { useTaskStore } from '@/store/TaskStore'
import { isNotEmptyArray } from '@/lib/utils'
import AlertRemove from './AlertRemove'

const ListTask = () => {
  const { openModal, setOpenModal } = useModalStore()
  const { tasks, taskCounter, closedTask, removeTask } = useTaskStore()
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({})
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  // Handle xử lý khi checkbox được check
  const handleCheckTask = (taskId: string) => {
    if (!checkedTasks[taskId]) {
      setCheckedTasks((prev) => ({
        ...prev,
        [taskId]: true,
      }))
      closedTask(taskId)
    }
  }

  // Handle remove task
  const handleRemoveTask = (taskId: string) => {
    setTaskToDelete(taskId)
    setShowDeleteAlert(true)
  }

  // Confirm remove task
  const confirmRemoveTask = () => {
    if (taskToDelete) {
      removeTask(taskToDelete)
      setTaskToDelete(null)
    }
  }

  return (
    <div className="container mx-auto">
      {/* Button */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Today's Task</h2>
          <span className="text-gray-500">Wednesday, 11 May</span>
        </div>
        <div className="btn__new-task">
          <Button
            onClick={() => setOpenModal(!openModal)}
            className="flex items-center gap-x-1 bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-600"
            variant="secondary"
          >
            <Plus />
            <span>New Task</span>
          </Button>
        </div>
      </div>
      {/* State */}
      <div className="pt-10 pb-6">
        <div className="flex w-full h-5 items-center gap-x-4 text-sm font-semibold">
          <div className="text-blue-500 flex items-center">
            <span className="mr-2 font-bold">All</span>
            <span className="rounded-s-xl rounded-e-xl bg-blue-500 text-xs text-white px-2 py-0.5 pb-1 font-normal">
              {tasks.length || 0}
            </span>
          </div>
          <Separator className="p-[1px] bg-gray-300 h-5" orientation="vertical" />
          <div className="w-full flex justify-center gap-x-3 font-medium text-gray-400">
            <p className="cursor-pointer">
              Open
              {taskCounter('open') > 0 && (
                <span className="ml-2 rounded-s-xl rounded-e-xl bg-blue-500 text-xs text-white px-2 py-0.5 pb-1 font-normal">
                  {taskCounter('open')}
                </span>
              )}
            </p>
            <Separator className="p-1" orientation="vertical" />
            <p className="cursor-pointer">
              Closed
              {taskCounter('closed') > 0 && (
                <span className="ml-2 rounded-s-xl rounded-e-xl bg-blue-500 text-xs text-white px-2 py-0.5 pb-1 font-normal">
                  {taskCounter('closed')}
                </span>
              )}
            </p>
            <Separator className="p-1" orientation="vertical" />
            <p className="cursor-pointer">
              Archived
              {/* {taskCounter('') > 0 && (
                <span className="ml-2 rounded-s-xl rounded-e-xl bg-blue-500 text-xs text-white px-2 py-0.5 pb-1 font-normal">
                  {taskCounter('')}
                </span>
              )} */}
            </p>
          </div>
        </div>
      </div>
      {/* Card Task */}
      <div className="h-[220px] flex flex-col gap-y-4 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 hover:scrollbar-thumb-black">
        {isNotEmptyArray(tasks) ? (
          tasks.map((item, index) => (
            <Card key={index} className="border-none shadow-sm py-2">
              <CardContent className="py-2">
                <div className="flex items-center justify-between">
                  <div className="w-4/5">
                    <h2
                      className={cn(
                        'font-semibold capitalize text-lg max-w-[220px] line-clamp-1',
                        checkedTasks[item.id] && 'line-through text-gray-400'
                      )}
                    >
                      {item.taskname}
                    </h2>
                    <span className={`text-gray-400 capitalize ${checkedTasks[item.id] ? 'line-through' : ''}`}>
                      {item.description}
                    </span>
                  </div>
                  <div className="w-1/5 flex justify-end">
                    <Checkbox
                      className="size-6 rounded-full"
                      checked={checkedTasks[item.id] || false}
                      onCheckedChange={() => handleCheckTask(item.id)}
                      disabled={checkedTasks[item.id]}
                    />
                  </div>
                </div>
              </CardContent>
              <Separator className="h-[1px] bg-gray-100 mx-6" />
              <CardFooter className="py-2 flex justify-between gap-x-2 text-gray-400">
                <div className="inline-flex gap-x-2">
                  <span>Date End:</span>
                  <span>{formatDate(item.date)}</span>
                </div>
                <span onClick={() => handleRemoveTask(item.id)} className="cursor-pointer">
                  <Trash2 className="text-red-500" size={20} />
                </span>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <ClipboardList size={48} strokeWidth={1.5} />
            <p className="font-medium mt-2">No task</p>
          </div>
        )}
        <AlertRemove open={showDeleteAlert} onOpenChange={setShowDeleteAlert} onConfirm={confirmRemoveTask} />
      </div>
    </div>
  )
}

export default ListTask
