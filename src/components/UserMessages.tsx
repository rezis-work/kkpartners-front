import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import contact from '@/hooks/contact'
import ConfirmModal from '@/components/modals/modal' // შეცვალე გზა საჭიროებისამებრ

function UserMessages() {
  const mutation = useMutation<
    unknown,
    Error,
    { name: string; email: string; message: string }
  >({
    mutationFn: (data) => contact(data.name, data.email, data.message),
    onError: (error) => {
      throw new Error('message component failed', error)
    },
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true) // გვაჩვენებს მოდალს გაგზავნამდე
  }

  const handleConfirm = () => {
    mutation.mutate({ name, email, message })

    console.log('Form submitted with values:', {
      name,
      email,
      message,
    })

    // Optionally reset form
    setName('')
    setEmail('')
    setMessage('')

    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-[30px] w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-15">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-b p-2 outline-none bg-transparent mt-[5px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="border-b p-2 outline-none bg-transparent mt-[10px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            rows={6}
            className="border-b p-1 outline-none bg-transparent"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#5b2c2c] text-white py-2 px-6 mt-2 w-fit cursor-pointer"
          >
            Send a message
          </button>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
          voluptatum magni, qui odio aliquam nisi voluptates aliquid praesentium
          quo consectetur minima ea quia ipsa in repudiandae soluta eaque eos
          non!
        </form>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        visible={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        qusestion="Do you want to send message"
      />
    </>
  )
}

export default UserMessages
