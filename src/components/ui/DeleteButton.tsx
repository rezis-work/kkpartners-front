import { useState } from "react"
import { Trash2Icon } from "lucide-react"
import toast from "react-hot-toast"
import { useDeleteFaq } from "@/hooks/faq-adm/useDeleteFaq"
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal"


interface DeleteButtonProps {
  id: string

}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const deleteFaq = useDeleteFaq()

  const handleDelete = () => {
    setIsDeleting(true)

    deleteFaq.mutate(id, {
      onSuccess: () => {
        toast.success("წაშლილია წარმატებით")
        setIsDeleting(false)
        setShowConfirmation(false)
      },
      onError: () => {
        toast.error("წაშლა ვერ მოხერხდა")
        setIsDeleting(false)
      },
    })
  }

  return (
    <>
  <button
    onClick={() => setShowConfirmation(true)}
    className="flex items-center text-red-600 hover:text-red-800 transition"
    disabled={isDeleting}
  >
    <Trash2Icon size={16} className="mr-1" />
    {isDeleting ? "Deleting..." : "Delete"}
  </button>

  <ConfirmDeleteModal
    open={showConfirmation}
    onCancel={() => setShowConfirmation(false)}
    onConfirm={handleDelete}
    loading={isDeleting}
    question="Are you sure you want to delete this item?"
  />
</>

  )
}
