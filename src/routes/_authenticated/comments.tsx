import { useMutation } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import userComents from '@/hooks/commentsHooks/UserComments'
import ConfirmModal from '@/components/modals/modal'

export const Route = createFileRoute('/_authenticated/comments')({
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

  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(0)
  const [fullname, setFullname] = useState('')
  const [position, setPosition] = useState('')
  const [showModal, setShowModal] = useState(false)

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
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr] bg-gray-100">
      <aside className="hidden md:block bg-[#2f3e47] text-white p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">UBOLD</h1>
        <nav className="space-y-2">
          <div className="hover:text-gray-300 cursor-pointer">Tables</div>
          <div className="hover:text-gray-300 cursor-pointer">Law</div>
          <Link to="/comments">message</Link>
        </nav>
      </aside>

      <form
        className="max-w-xl lg:w-1/2 mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg space-y-8"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Submit a Quote
        </h2>

        {/* Quote */}
        <div className="space-y-2">
          <label
            htmlFor="Quotes"
            className="block text-sm font-medium text-gray-700"
          >
            Quote
          </label>
          <input
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            type="text"
            id="Quotes"
            placeholder="Enter a quote"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
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
            className={`w-full px-4 py-2 rounded-lg border ${
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
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            id="fullname"
            placeholder="Enter full name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Position */}
        <div className="space-y-2">
          <label
            htmlFor="Position"
            className="block text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            type="text"
            id="Position"
            placeholder="Enter position"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      <ConfirmModal
        visible={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        qusestion="Do you want to add new quote?"
      />
    </div>
  )
}
