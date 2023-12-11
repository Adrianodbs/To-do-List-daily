import { createContext, useContext, useEffect, useState } from 'react'

interface ContextProps {
  children: React.ReactNode
}

export interface TaskItemProps {
  id: string
  title: string
  date: string
}

export interface TaskContextProps {
  newTask: string
  setNewTask: React.Dispatch<React.SetStateAction<string>>
  tasks: TaskItemProps[]
  setTasks: React.Dispatch<React.SetStateAction<TaskItemProps[]>>
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined)

export function TaskProvider({ children }: ContextProps) {
  const [newTask, setNewTask] = useState('')
  const storedTasks = localStorage.getItem('@tasks-daily')
  const [tasks, setTasks] = useState<TaskItemProps[]>(
    storedTasks ? JSON.parse(storedTasks) : []
  )

  useEffect(() => {
    storedTasks
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('@tasks-daily', JSON.stringify(tasks))
  }, [tasks])
  return (
    <TaskContext.Provider value={{ newTask, setNewTask, tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TaskContext)
}
