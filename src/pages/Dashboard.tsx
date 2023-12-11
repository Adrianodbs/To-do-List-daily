import { Link } from 'react-router-dom'
import { TaskContextProps, useTaskContext } from '../contexts/taskContext'

export default function Dashboard() {
  const { tasks } = useTaskContext() as TaskContextProps
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
        {tasks.map(task => (
          <p>{task.title}</p>
        ))}
      </div>
    </div>
  )
}
