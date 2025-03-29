type State = 'open' | 'closed' | 'archived'

export interface Task {
  id: string
  taskname: string
  description: string
  category: string
  date: string
  state: State
}
