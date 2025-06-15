import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import userComents from '@/hooks/commentsHooks/UserComments'
import ConfirmModal from '@/components/modals/modal'

export const Route = createFileRoute('/_authenticated/dashboard/userComments')({
  component: RouteComponent,
})

function RouteComponent() {
  const mutation = useMutation<
    unknown,
    Error,
    { quote: string; rating: number; fullname: string; position: string }
  >({
    mutationFn: (data) =>
      userComents(data.quote, data.rating, data.fullname, data.position),
    onError: (error) => {
      throw new Error('mutation in comments component does not working', error)
    },
  })
  const navigate = useNavigate()

  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(0)
  const [fullname, setFullname] = useState('')
  const [position, setPosition] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showmodale, setShowModale] = useState(false)

  // ღილაკზე დაჭერისას ვაჩვენებთ მოდალს
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleConfirm = () => {
    mutation.mutate({ quote, rating, fullname, position })

    console.log('Form submitted with values:', {
      quote,
      rating,
      fullname,
      position,
    })

    setShowModal(false)

    // Optional: form reset
    setQuote('')
    setFullname('')
    setPosition('')
    setRating(0)
    setShowModal(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 relative">
      {/* Dashboard Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setShowModale(true)}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Submit a Quote
        </h2>

        {/* Quote */}
        <div className="space-y-2">
          <label htmlFor="Quotes" className="text-sm font-medium text-gray-700">
            Quote
          </label>
          <input
            required
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            type="text"
            id="Quotes"
            placeholder="Enter a quote"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label htmlFor="rating" className="text-sm font-medium text-gray-700">
            Rating (0 to 5)
          </label>
          <input
            max={5}
            min={0}
            type="number"
            name="rating"
            id="rating"
            placeholder="Enter rating"
            value={rating}
            onChange={(e) => {
              const value = e.target.value
              if (!isNaN(Number(value))) {
                setRating(Number(value))
              }
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              isNaN(rating) ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {isNaN(rating) && (
            <p className="text-red-500 text-sm">Please enter a valid number</p>
          )}
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="fullname"
            className="text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            id="fullname"
            placeholder="Enter full name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Position */}
        <div className="space-y-2">
          <label
            htmlFor="Position"
            className="text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <input
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            type="text"
            id="Position"
            placeholder="Enter position"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmModal
        visible={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        qusestion="Do you want to add new quote?"
      />
      <ConfirmModal
        visible={showmodale}
        onConfirm={() => {
          setShowModale(false)
          navigate({ to: '/dashboard' })
        }}
        onCancel={() => setShowModale(false)}
        qusestion="Are you sure you want back to Dashboard?"
      />
    </div>
  )
}
