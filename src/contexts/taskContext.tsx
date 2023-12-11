import { createContext, useContext, useEffect, useState } from 'react'

interface ContextProps {
  children: React.ReactNode
}

const TaskContext = createContext<any>(null)

export function TaskProvider({ children }: ContextProps) {
  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>
}
