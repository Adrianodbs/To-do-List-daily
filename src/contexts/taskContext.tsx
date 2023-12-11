import { createContext, useContext, useEffect, useState } from 'react'

interface ContextProps {
  children: React.ReactNode
}

export interface TaskItemProps {
  id: string
  title: string
  date: string
  isChecked: boolean
}

export interface TaskContextProps {
  newTask: string
  setNewTask: React.Dispatch<React.SetStateAction<string>>
  tasks: TaskItemProps[]
  setTasks: React.Dispatch<React.SetStateAction<TaskItemProps[]>>
  taskDone: TaskItemProps[]
  setTaskDone: React.Dispatch<React.SetStateAction<TaskItemProps[]>>
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined)

export function TaskProvider({ children }: ContextProps) {
  const [newTask, setNewTask] = useState('')
  const storedTasks = localStorage.getItem('@tasks-daily')
  const storedTaskDone = localStorage.getItem('@taskDone-daily')
  const [tasks, setTasks] = useState<TaskItemProps[]>(
    storedTasks ? JSON.parse(storedTasks) : []
  )

  const [taskDone, setTaskDone] = useState<TaskItemProps[]>(
    storedTaskDone ? JSON.parse(storedTaskDone) : []
  )
  useEffect(() => {
    storedTasks
  }, [tasks])

  useEffect(() => {
    storedTaskDone
  }, [taskDone])

  useEffect(() => {
    localStorage.setItem('@taskDone-daily', JSON.stringify(taskDone))
  }, [taskDone])

  useEffect(() => {
    localStorage.setItem('@tasks-daily', JSON.stringify(tasks))
  }, [tasks])
  return (
    <TaskContext.Provider
      value={{ newTask, setNewTask, tasks, setTasks, taskDone, setTaskDone }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TaskContext)
}
