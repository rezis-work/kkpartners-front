import { useEffect, useState } from 'react'

import { Route as TanStackRoute } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query'

import getFaqs from '../api/getFaqs'

import { rootRoute } from './__root'

import FaqTitle from '@/components/FaqTitle'

export const Route = new TanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: Faq,
})

type FaqItem = {
  question: string
  answer: string
}

function Faq() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const {
    data: faqData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs,
  })

  if (isLoading) return <div className="p-6">Loading FAQs...</div>
  if (error) return <div className="p-6 text-red-500">Failed to load FAQs.</div>

  const numbers: Array<string> = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
  ]

  if (faqData === undefined) {
    return <div>no faqs found</div>
  }

  return (
    <div>
      <img src="faqimage/faq-ta.jpg" />
      <div className="mx-[20px] mt-[50px] md:mx-[45px] lg:mx-[50px]  lg:grid lg:grid-cols-2  ">
        <FaqTitle
          title="Frequently asked questions"
          subtitle="Sed ut perspiciatis unde omnis iste, sed ut perspiciatis unde omnis iste."
        />

        <div className="mt-[25px] ">
          {faqData.map((item: FaqItem, index: number) => (
            <div key={index} className="px-2 md:px-4 lg:px-6">
              <button
                className="w-full flex justify-between items-center py-6"
                onClick={() =>
                  setClickedIndex(clickedIndex === index ? null : index)
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="text-gray-500 font-semibold md:text-[25px]">
                  {numbers[index]}
                </span>
                <span className="flex-1 mx-4 text-left font-semibold text-[20px] md:text-[30px] lg:text-[25px]">
                  {item.question}
                </span>
                <span className="text-xl font-bold text-blue-900 md:text-[35px] lg:text-[27px]">
                  {hoveredIndex === index ? '-' : '+'}
                </span>
              </button>
              {clickedIndex === index && (
                <p className="mb-2 ml-[30px] text-gray-600 md:text-[30px] lg:text-[20px]">
                  {item.answer}
                </p>
              )}
              <div className="border-b border-gray-300 w-full py-[5px]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
