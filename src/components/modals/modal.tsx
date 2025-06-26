import React from 'react'
import { toast } from 'react-hot-toast'

type Props = {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
  question: string
}

const ConfirmModal: React.FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
  question,
}) => {
  if (!visible) return null

  const handleConfirm = () => {
    onConfirm()
    toast.success('Confirmed successfully') 
  }

  const handleCancel = () => {
    onCancel()
    toast('Action cancelled', { icon: '⚠️' }) 
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center transition-all duration-500">
      <div className="bg-white/80 backdrop-blur-lg p-12 rounded-[2rem] shadow-2xl w-[90%] max-w-md text-center border border-white/20 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {question}
        </h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleConfirm}
            className="bg-gradient-to-br from-emerald-400 to-green-500 text-white px-10 py-3 rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-green-200/50 hover:-translate-y-1"
          >
            Yes
          </button>
          <button
            onClick={handleCancel}
            className="bg-gradient-to-br from-rose-400 to-red-500 text-white px-10 py-3 rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-red-200/50 hover:-translate-y-1"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
