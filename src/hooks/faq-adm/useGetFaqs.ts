import { useQuery } from '@tanstack/react-query'

type Faq = {
  _id: string
  question: string
  answer: string
  createdAt: string
  updatedAt: string
}

type ResponseType = {
  message: string
  faqs: Faq[]
}

export const useGetFaqs = () =>
  useQuery<ResponseType>({
    queryKey: ['faq'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/api/faq`)
      if (!res.ok) throw new Error('Failed to fetch FAQs')
      return res.json()
    },
  })
