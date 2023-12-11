import { Link } from 'react-router-dom'
import {
  TaskContextProps,
  TaskItemProps,
  useTaskContext
} from '../contexts/taskContext'

export default function Dashboard() {
  const { taskDone } = useTaskContext() as TaskContextProps

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

  return (
    <div className="w-full flex justify-center items-center min-h-[100vh] bg-violet-700 text-violet-700">
      <div className="flex flex-col justify-start items-center p-4 max-w-4xl w-[90%] min-h-[80vh] bg-white rounded-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-[24px] font-bold">Dashboard</h2>
          <Link to="/">
            <p className="text-violet-500 text-sm underline">
              Volte para a home
            </p>
          </Link>
        </div>

        {Object.keys(groupedTaskDone).map(date => (
          <div key={date}>
            <h3>{date}</h3>
            {groupedTaskDone[date].map(task => (
              <p key={task.id}>{task.title}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
