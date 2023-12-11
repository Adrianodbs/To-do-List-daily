import { FormEvent, useEffect, useState } from 'react'
import Form from '../components/Form'
import Task from '../components/Task'
import { v4 as uuidv4 } from 'uuid'

interface TaskItemProps {
  id: string
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
      id: uuidv4(),
      title: newTask
    }

    setTasks((allTasks: TaskItemProps[]) => [...allTasks, newItem])
    setNewTask('')
  }

  function handleDelete(taskId: string) {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
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

        <div className="flex flex-col justify-center items-center w-full gap-3">
          {tasks.map(task => (
            <Task
              key={task.id}
              title={task.title}
              onClick={() => handleDelete(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
