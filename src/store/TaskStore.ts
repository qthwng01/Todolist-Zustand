import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { produce } from 'immer'
import { Task } from '@/types'

interface TaskState {
  tasks: Task[]
  addTask: (task: Task) => void
  closedTask: (taskId: string) => void
  removeTask: (taskId: string) => void
  taskCounter: (state: 'open' | 'closed') => number
  summaryTask: () => number
  progressTask: () => number
}

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] }), false, 'addTask'),
        closedTask: (taskId: string) =>
          set(
            produce((state: TaskState) => {
              const taskIndex = state.tasks.findIndex((i) => i.id === taskId)
              if (taskIndex !== -1) state.tasks[taskIndex].state = 'closed'
            }),
            false,
            'closedTask'
          ),
        removeTask: (taskId: string) =>
          set(
            produce((state: TaskState) => {
              const taskIndex = state.tasks.findIndex((i) => i.id === taskId)
              if (taskIndex !== -1) state.tasks.splice(taskIndex, 1)
            }),
            false,
            'removeTask'
          ),
        taskCounter: (state: 'open' | 'closed') => {
          const { tasks } = get()
          return tasks.filter((task) => task.state === state).length
        },
        summaryTask: () => {
          const { tasks } = get()
          return tasks.length
        },
        progressTask: () => {
          const { tasks } = get()
          const totalTasks = tasks.length
          const completedTasks = tasks.filter((task) => task.state === 'closed').length
          const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
          return progress
        },
      }),
      {
        name: 'task-storage',
      }
    ),
    {
      name: 'task-store',
    }
  )
)
