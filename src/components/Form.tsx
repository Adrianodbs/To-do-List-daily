import { ChangeEvent, FormEvent } from 'react'
import { CiSquarePlus } from 'react-icons/ci'

interface InputProps {
  onSubmit: (event: FormEvent) => void
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ onSubmit, value, onChange }: InputProps) {
  return (
    <form
      className="flex w-[90%] justify-center gap-3 items-center p-4"
      onSubmit={onSubmit}
    >
      <input
        className="border-gray-600 border-solid border-[1px] p-1 rounded-md outline-none max-w-[600px] w-full "
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={value}
        onChange={onChange}
      />
      <button className="text-violet-700 hover:-scale-110" type="submit">
        <CiSquarePlus size={32} />
      </button>
    </form>
  )
}
