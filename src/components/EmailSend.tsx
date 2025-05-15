import emailjs from '@emailjs/browser'
import { useState } from 'react'
import toast from 'react-hot-toast'
import EmailKeys from '../components/emailservice/EmailService'

function EmailSend() {
  const [message, setMessage] = useState('') // ახალი state შეტყობინებისთვის

  function sendEmail(e: any) {
    e.preventDefault()
    const templateParams = {
      message: message, // შეტყობინების დამატება
    }
    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then((res: { status: any; text: any }) => {
        toast.success('Sent successfully')
        console.log('ელფოსტა წარმატებით გაიგზავნა', res.status, res.text)

        setMessage('') // შეტყობინების გასუფთავება
      })
      .catch((err: any) => {
        toast.error('Something went wrong, try again.')
        console.error('ელფოსტის გაგზავნის შეცდომა', err)
      })
    if (!EmailKeys.serviceId || !EmailKeys.publicKey || !EmailKeys.templateId) {
      throw new Error('email keys error')
    }
  }

  return (
    <>
      <form className="flex w-full gap-5.5 h-10" onSubmit={sendEmail}>
        <textarea
          className="w-1/2 lg:w-1/2 flex items-start border-b-1 text-white placeholder:text-white xl:w-fu"
          style={{ outline: 'none' }}
          placeholder="Your message"
          id="message"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)} // შეტყობინების ცვლილება
        />
        <button onClick={sendEmail} className="border-b-1 cursor-pointer w-fit">
          Send<span>↗</span>
        </button>
      </form>
    </>
  )
}

export default EmailSend
