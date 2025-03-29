import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Kiểm tra xem một mảng có rỗng, null hoặc undefined hay không
 * @param arr - Mảng cần kiểm tra
 * @returns true nếu mảng là null, undefined hoặc rỗng, ngược lại trả về false
 */
export function isEmptyArray<T>(arr: T[] | null | undefined): boolean {
  return arr === null || arr === undefined || arr.length === 0
}

/**
 * Kiểm tra xem một mảng có phần tử hay không (không rỗng, không null, không undefined)
 * @param arr - Mảng cần kiểm tra
 * @returns true nếu mảng có ít nhất một phần tử, ngược lại trả về false
 */
export function isNotEmptyArray<T>(arr: T[] | null | undefined): boolean {
  return !isEmptyArray(arr)
}

export function formatDate(dateString: string) {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}
