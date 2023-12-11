import { FaTrash } from 'react-icons/fa'

interface TaskProps {
  title: string
  onClick: () => void
}

export default function Task({ title, onClick }: TaskProps) {
  return (
    <div className="flex w-[90%] bg-gray-200 rounded h-8 p-3 items-center justify-between">
      <div className="flex items-center gap-2">
        <input type="checkbox" />
        <p>{title}</p>
      </div>
      <FaTrash className="text-red-500 cursor-pointer" onClick={onClick} />
    </div>
  )
}
