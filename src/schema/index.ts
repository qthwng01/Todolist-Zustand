import { z } from 'zod'
import { categoryEnum } from '@/constants'

export const taskSchema = z.object({
  // Task name
  taskname: z
    .string({
      required_error: 'Task Name is required.',
    })
    .min(10)
    .max(200),
  // Category
  category: z.enum(categoryEnum, {
    required_error: 'Category is required.',
  }),
  // Date
  date: z.string().pipe(
    z.string({
      required_error: 'Date is required.',
    }).date()
  ),
  // // Time
  // time: z
  //   .string({
  //     required_error: 'Time is required.',
  //   })
  //   .time(),
  // Description
  description: z
    .string({
      required_error: 'Description is required.',
    })
    .min(10)
    .max(500),
})
