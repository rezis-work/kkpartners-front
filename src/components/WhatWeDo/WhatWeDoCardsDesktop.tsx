import type { Card } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { GoArrowUpRight } from 'react-icons/go'

function WhatWeDoCardsDesktop({
  data,
  activeCardIndex,
  toggleDesktopCard,
}: {
  data: Card[]
  activeCardIndex: number | null
  toggleDesktopCard: (index: number) => void
}) {
  return (
    <div className="hidden lg:flex w-full h-[600px] bg-[#4B2524] px-12 py-10 relative">
      <div className="flex-1 pr-10 relative overflow-hidden">
        <AnimatePresence initial={false}>
          {activeCardIndex !== null && (
            <motion.div
              key={activeCardIndex}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-full flex gap-10"
            >
              <div className="flex flex-col justify-center gap-y-2 max-w-[300px]">
                <p className="text-white text-[26px] font-semibold mb-2">
                  {data[activeCardIndex].title}
                </p>
                <p className="text-white text-[16px] mb-4 max-w-[400px]">
                  {data[activeCardIndex].description}
                </p>
                <button className="bg-white max-w-[200px] px-6 py-3 font-semibold text-[15px] cursor-pointer hover:underline">
                  Read More
                </button>
              </div>
              <img
                className="mb-6 object-contain"
                src={data[activeCardIndex].image}
                alt={data[activeCardIndex].title}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-[400px] flex flex-col gap-y-2">
        <h1 className="text-white text-[38px] font-semibold mb-6">
          Practice areas
        </h1>
        {data.map((card: Card, index: number) => (
          <div key={index} className="w-full">
            <div
              onClick={() => toggleDesktopCard(index)}
              className="w-full flex items-center justify-between py-4 cursor-pointer"
              style={{ borderBottom: '1px solid #6a4443' }}
            >
              <h2
                className={`${index !== activeCardIndex ? 'text-gray-500' : 'text-white'} text-[24px] font-normal`}
              >
                <span>{index < 9 ? `0${index + 1}` : index + 1}</span>{' '}
                {card.position}
              </h2>
              <GoArrowUpRight
                className={`${index !== activeCardIndex ? 'text-gray-500' : 'text-white'} w-[28px] h-[28px] transition-transform duration-500 ease-in-out`}
                style={{
                  transform:
                    activeCardIndex === index
                      ? 'rotate(270deg)'
                      : 'rotate(0deg)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhatWeDoCardsDesktop
