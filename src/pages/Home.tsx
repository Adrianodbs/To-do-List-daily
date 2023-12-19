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

import { toast } from 'react-toastify'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

export default function Home() {
  const { newTask, setNewTask, tasks, setTasks, setTaskDone } =
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
    toast.success(`A tarefa '${newTask}' foi adicionada com sucesso!`)
    setNewTask('')
  }

  function handleDelete(taskId: string) {
    const taskToDelete = tasks.find((task: TaskItemProps) => task.id === taskId)
    if (!taskToDelete) {
      return
    }
    const updatedTasks = tasks.filter(
      (task: TaskItemProps) => task.id !== taskId
    )

    toast.success(`A tarefa '${taskToDelete.title}' foi deletada!`)
    setTasks(updatedTasks)
  }

  function handleTaskDone() {
    const completedTasks = tasks.filter(task => task.isChecked)

    if (completedTasks.length === 0) {
      toast.warn('Nenhuma tarefa selecionada')
      return
    }

    setTaskDone(prevTaskDone => [...prevTaskDone, ...completedTasks])

    const updatedTasks = tasks.filter(task => !task.isChecked)
    setTasks(updatedTasks)

    if (completedTasks.length === 1) {
      toast.success(`A tarefa '${completedTasks[0].title}' foi enviada`)
    } else {
      toast.success('As tarefas foram enviadas')
    }
  }

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    const items = reorder(tasks, result.source.index, result.destination.index)

    setTasks(items)
  }

  return (
    <div className="w-full flex justify-center items-center min-h-[100vh] bg-violet-700 text-violet-700">
      <div className="flex flex-col justify-start items-center p-4 max-w-4xl w-[90%] min-h-[80vh] bg-white rounded-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-[24px] font-bold">Tarefas diárias</h2>
          <h4 className="text-center font-bold">
            Arraste as tarefas para coloca-las na ordem de relevância
          </h4>
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

        <div className="w-full">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" type="list" direction="vertical">
              {provided => (
                <article
                  className="flex flex-col justify-center items-center w-full gap-3"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => (
                    <Task
                      key={task.id}
                      taskItem={task}
                      onClick={() => handleDelete(task.id)}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </article>
              )}
            </Droppable>
          </DragDropContext>
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
