import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import DeleteButton from '@/components/ui/DeleteButton'
import FaqModal from '@/components/modals/ConfirmModal'
import FaqAddModal from '@/components/modals/FaqAddModal'
import { Edit2Icon } from 'lucide-react'
import FaqSkeleton from '@/components/ui/FaqSkeleton'

interface FaqItem {
  _id: string
  question: string
  answer: string
  faq: boolean
}

export const Route = createFileRoute('/_authenticated/dashboard/faq-page')({
  component: FaqPageComponent,
})

function FaqPageComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['faq'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/faq')
      if (!res.ok) throw new Error('Failed to fetch FAQ')
      return res.json()
    },
  })

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  if (isLoading)
     return <FaqSkeleton />
      
    

  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Error: {(error as Error).message}
      </div>
    )

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">FAQ Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New FAQ
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold tracking-wide">
                Question
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold tracking-wide">
                Answer
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.faqs?.map((faq: FaqItem, index: number) => (
              <tr
                key={faq._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-50 transition-colors border-t border-gray-200`}
              >
                <td className="py-4 px-4">{faq.question}</td>
                <td className="py-4 px-4">{faq.answer}</td>
                <td className="py-4 px-4 text-center space-x-2">
                  <button
                    className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
                    onClick={() => setEditingFaq(faq)}
                  >
                    <Edit2Icon size={16} className="mr-1" />
                    Edit
                  </button>
                  <DeleteButton id={faq._id} />
                </td>
              </tr>
            ))}
            {data?.faqs?.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  No FAQs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingFaq && (
        <FaqModal
          faq={editingFaq}
          onClose={() => setEditingFaq(null)}
        />
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <FaqAddModal
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  )
}

export default FaqPageComponent
