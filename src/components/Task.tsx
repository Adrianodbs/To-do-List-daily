import { FaTrash } from 'react-icons/fa'
import { TaskContextProps, useTaskContext } from '../contexts/taskContext'
import { Draggable } from '@hello-pangea/dnd'

interface TaskProps {
  taskItem: {
    id: string
    title: string
  }
  onClick: () => void
  index: number
}

export default function Task({ taskItem, onClick, index }: TaskProps) {
  const { tasks, setTasks } = useTaskContext() as TaskContextProps

  const task = tasks.find(task => task.id === taskItem.id)

  if (!task) {
    return null
  }

  const handleCheckboxChange = () => {
    const updatedTasks = tasks.map(t =>
      t.id === taskItem.id ? { ...t, isChecked: !t.isChecked } : t
    )
    setTasks(updatedTasks)
  }

  return (
    <Draggable draggableId={taskItem.id} index={index}>
      {provided => (
        <div
          className="flex w-[95%] bg-gray-200 rounded min-h-8 p-3 items-center justify-between cursor-pointer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-violet-600"
              checked={task.isChecked || false}
              onChange={handleCheckboxChange}
            />
            <p
              className={`uppercase font-bold ${
                task.isChecked ? 'line-through' : ''
              }`}
            >
              {taskItem.title}
            </p>
          </div>
          <FaTrash className="text-red-500 cursor-pointer" onClick={onClick} />
        </div>
      )}
    </Draggable>
  )
}
