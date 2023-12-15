import { Link } from 'react-router-dom'
import {
  TaskContextProps,
  TaskItemProps,
  useTaskContext
} from '../contexts/taskContext'
import TaskDone from '../components/TaskDone'
import Rank from '../components/Rank'

export default function Dashboard() {
  const { taskDone, setTaskDone } = useTaskContext() as TaskContextProps

  const groupByDate = (tasks: TaskItemProps[]) => {
    const groupedTasks: { [key: string]: TaskItemProps[] } = {}

    tasks.forEach(task => {
      if (!groupedTasks[task.date]) {
        groupedTasks[task.date] = []
      }
      groupedTasks[task.date].push(task)
    })

    return groupedTasks
  }

  const groupedTaskDone = groupByDate(taskDone)

  function handleDelete(taskId: string) {
    const updatedTaskDone = taskDone.filter(task => task.id !== taskId)
    setTaskDone(updatedTaskDone)
  }

  return (
    <div className="w-full flex flex-col justify-start items-center px-6 py-4 min-h-[100vh] bg-violet-700 text-white">
      <div className="flex flex-col items-center">
        <h2 className="text-[24px] font-bold">Dashboard</h2>
        <Link to="/">
          <p className="text-gray-100 text-sm underline">Volte para a home</p>
        </Link>
      </div>

      <Rank />

      {Object.keys(groupedTaskDone).map(date => (
        <div
          key={date}
          className="mt-4 w-full flex flex-col justify-center items-center"
        >
          <h3 className="mb-4 font-bold text-[20px]">
            Tarefas realizadas no dia: {date}
          </h3>
          {groupedTaskDone[date].map(task => (
            <TaskDone
              title={task.title}
              onClick={() => handleDelete(task.id)}
              key={task.id}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
