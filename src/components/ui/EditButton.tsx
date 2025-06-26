import { Edit2Icon } from 'lucide-react'
interface EditButtonProps {
  onClick: () => void
}

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-blue-700 hover:text-blue-900 transition"
    >
      <Edit2Icon size={16} className="mr-1" />
      Edit
    </button>
  )
}
