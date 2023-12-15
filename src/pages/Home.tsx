import { FormEvent } from 'react'
import Form from '../components/Form'
import Task from '../components/Task'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import {
  TaskContextProps,
  TaskItemProps,
  useTaskContext
} from '../contexts/taskContext'
import { getCurrentDate } from '../utils/getCurrentDate'

export default function Home() {
  const { newTask, setNewTask, tasks, setTasks, taskDone, setTaskDone } =
    useTaskContext() as TaskContextProps

  function handleAddTask(event: FormEvent) {
    event.preventDefault()

    if (newTask === '') return

    let newItem = {
      id: uuidv4(),
      title: newTask,
      date: getCurrentDate(),
      isChecked: false
    }

    setTasks((allTasks: TaskItemProps[]) => [...allTasks, newItem])
    setNewTask('')
  }

  function handleDelete(taskId: string) {
    const updatedTasks = tasks.filter(
      (task: TaskItemProps) => task.id !== taskId
    )
    setTasks(updatedTasks)
  }

  function handleTaskDone() {
    const completedTasks = tasks.filter(task => task.isChecked)

    setTaskDone(prevTaskDone => [...prevTaskDone, ...completedTasks])

    const updatedTasks = tasks.filter(task => !task.isChecked)
    setTasks(updatedTasks)

    console.log(taskDone)
  }

  return (
    <div className="w-full flex justify-center items-center min-h-[100vh] bg-violet-700 text-violet-700">
      <div className="flex flex-col justify-start items-center p-4 max-w-4xl w-[90%] min-h-[80vh] bg-white rounded-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-[24px] font-bold">Tarefas diárias</h2>
          <Link to="/dashboard">
            <p className="text-violet-500 text-sm underline">
              Acesse o dashboard
            </p>
          </Link>
        </div>

        <Form
          onSubmit={handleAddTask}
          value={newTask}
          onChange={event => setNewTask(event.target.value)}
        />

        <div className="flex flex-col justify-center items-center w-full gap-3">
          {tasks.map(task => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              onClick={() => handleDelete(task.id)}
            />
          ))}
        </div>
        {tasks.length > 0 ? (
          <button
            onClick={handleTaskDone}
            className="bg-violet-700 text-white p-3 mt-3 rounded-lg hover:opacity-80"
          >
            Enviar tarefas realizadas
          </button>
        ) : (
          <button
            className="bg-violet-700 text-white p-3 mt-3 rounded-lg opacity-40 cursor-not-allowed"
            disabled
          >
            Sem tarefas adicionadas
          </button>
        )}
      </div>
    </div>
  )
}
