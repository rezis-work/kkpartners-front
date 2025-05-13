import { AnimatePresence, motion } from 'framer-motion'
import { GoArrowUpRight } from 'react-icons/go'

interface Card {
  position: string
  image: string
  title: string
  description: string
}

function WhatWeDoCardsMobile({
  data,
  openCardIndex,
  toggleCard,
}: {
  data: Card[]
  openCardIndex: number | null
  toggleCard: (index: number) => void
}) {
  return (
    <div className="w-full bg-[#4B2524] py-[55px] px-6">
      <h1 className="text-white text-[38px] font-semibold mb-[80px]">
        Practice areas
      </h1>
      <div className="w-full flex flex-col items-start gap-y-1">
        {data.map((card: Card, index: number) => (
          <div className="w-full" key={index}>
            <div
              onClick={() => toggleCard(index)}
              className="w-full flex items-center justify-between pb-[2px] cursor-pointer"
              style={{ borderBottom: '1px solid #6a4443' }}
            >
              <h2 className="text-white text-[30px] font-normal">
                <span>{index < 9 ? `0${index + 1}` : index + 1}</span>{' '}
                {card.position}
              </h2>
              <GoArrowUpRight
                className="text-white w-[32px] h-[32px] transition-transform duration-500 ease-in-out"
                style={{
                  transform:
                    openCardIndex === index ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              />
            </div>
            <AnimatePresence initial={false}>
              {openCardIndex === index && (
                <motion.div
                  key="card-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full overflow-hidden"
                  style={{
                    marginBottom: index !== data.length - 1 ? '55px' : '0',
                  }}
                >
                  <img
                    className="my-[30px]"
                    src={card.image}
                    alt={card.title}
                  />
                  <p className="text-white text-[23px] font-normal mb-[10px]">
                    {card.title}
                  </p>
                  <p className="text-white text-[15px] font-normal mb-5">
                    {card.description}
                  </p>
                  <button className="bg-white px-6 py-3 font-semibold text-[15px] cursor-pointer hover:underline">
                    Read More
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhatWeDoCardsMobile
