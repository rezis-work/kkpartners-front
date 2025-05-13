import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Message() {
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSent(true)
        setFormData({ name: '', email: '', message: '' })
        toast.success('Contact information sent successfully')
      } else {
        toast.error('message can not send')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('unknown error occured')
      }
    }
  }

  return (
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
            className="border-b p-2 outline-none bg-transparent  mt-[5px]"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="border-b p-2 outline-none bg-transparent  mt-[10px]"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          rows={8}
          className="border-b p-1 outline-none bg-transparent"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-[#5b2c2c] text-white py-2 px-6 mt-2 w-fit"
        >
          Send a message
        </button>
      </form>
    </div>
  )
}
