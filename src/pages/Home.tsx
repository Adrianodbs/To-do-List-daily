import { FormEvent, useEffect, useState } from 'react'
import Form from '../components/Form'

interface TaskItemProps {
  title: string
}

export default function Home() {
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

  function handleAddTask(event: FormEvent) {
    event.preventDefault()

    if (newTask === '') return

    let newItem = {
      title: newTask
    }

    setTasks((allTasks: TaskItemProps[]) => [...allTasks, newItem])
    setNewTask('')
  }
  return (
    <div className="w-full flex justify-center items-center min-h-[100vh] bg-violet-700 text-violet-700">
      <div className="flex flex-col justify-start items-center p-4 max-w-4xl w-[90%] min-h-[80vh] bg-white rounded-lg">
        <h2>Tarefas diárias</h2>
        <Form
          onSubmit={handleAddTask}
          value={newTask}
          onChange={event => setNewTask(event.target.value)}
        />
      </div>
    </div>
  )
}
