import { CiSquarePlus } from 'react-icons/ci'

interface InputProps {
  onClick: () => void
}

export default function Input({ onClick }: InputProps) {
  return (
    <label className="flex w-[90%] justify-center gap-3 items-center p-4">
      <input
        className="border-gray-600 border-solid border-[1px] p-1 rounded-md outline-none "
        type="text"
        placeholder="Adicione uma nova tarefa"
      />
      <button className="text-violet-700]" onClick={onClick}>
        <CiSquarePlus size={32} />
      </button>
    </label>
  )
}
