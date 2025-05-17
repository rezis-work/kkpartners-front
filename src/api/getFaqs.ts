import type { JSX } from 'react/jsx-runtime'

export type FaqItem = {
  map(
    arg0: (
      item: { question: string; answer: string },
      index: number,
    ) => JSX.Element,
  ): import('react').ReactNode
  question: string
  answer: string
}

async function getFaqs(): Promise<FaqItem> {
  const response = await fetch('http://localhost:4000/api/faq')

  if (!response.ok) {
    throw new Error('Failed to fetch FAQ')
  }
  const data = await response.json()
  return data.faqs
}

export default getFaqs
