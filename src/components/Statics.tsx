import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from "@/components/ui/separator"
import { useTaskStore } from '@/store/TaskStore'

const Statics = () => {
  const { summaryTask, progressTask } = useTaskStore()
  const progressPercent = progressTask()
  const [progress, setProgress] = React.useState<number>(progressPercent)

  React.useEffect(() => {
    setProgress(progressTask())
  }, [progressPercent])

  return (
    <div className="container mx-auto text-white">
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl p-4">
        <h2 className="text-md font-bold">Today's Task Progress Summary</h2>
        <span className="text-sm font-normal">{summaryTask() || 0} Tasks</span>
        <div className="flex items-center my-4">
          <div className="w-1/5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-4/5">
            <div className="flex flex-col">
              <div className="w-full inline-flex justify-between">
                <span>Progress</span>
                <span>{Math.round(progress) + '%' || '0%'}</span>
              </div>
              <Progress className="my-2" value={progress} />
            </div>
          </div>
        </div>
      </div>
      <Separator className='my-4' />
    </div>
  )
}

export default Statics
