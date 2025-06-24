import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useUpdateFaq } from '@/hooks/faq-adm/useUpdateFaq'
import { X } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface FaqEditModalProps {
  faq: {
    _id: string
    question: string
    answer: string
  }
  onClose: () => void
}

export default function FaqEditModal({ faq, onClose }: FaqEditModalProps) {
  const [question, setQuestion] = useState(faq.question)
  const [answer, setAnswer] = useState(faq.answer)

  const updateFaq = useUpdateFaq()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFaq.mutate(
      { id: faq._id, question, answer },
      {
        onSuccess: () => {
          toast.success('FAQ updated successfully')  
          onClose()
        },
        onError: (err: any) => {
          toast.error(err.message || 'Failed to update FAQ') 
        },
      }
    )
  }

  return (
    <Dialog.Root open onOpenChange={(val) => !val && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Edit FAQ</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Question"
              required
            />
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Answer"
              rows={4}
              required
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                disabled={updateFaq.isPending}
              >
                {updateFaq.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
