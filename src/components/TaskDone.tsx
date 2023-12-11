import { FaTrash } from 'react-icons/fa'

interface TaskDoneProps {
  title: string
  onClick: () => void
}

export default function TaskDone({ onClick, title }: TaskDoneProps) {
  return (
    <div className="flex max-w-[600px] w-[95%] bg-gray-200 text-violet-700 rounded min-h-8 p-3 items-center justify-between mb-2">
      <p className="uppercase font-bold ">{title}</p>
      <FaTrash className="text-red-500 cursor-pointer" onClick={onClick} />
    </div>
  )
}
