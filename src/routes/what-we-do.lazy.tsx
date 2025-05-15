import { getPracticeAreas } from '@/api/getPracticeAreas'
import HeaderMain from '@/components/header/HeaderMain'
import WhatWeDoGridLayout from '@/components/WhatWeDo/WhatWeDoGridLayout'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import WhatWeDoCardsMobile from '@/components/WhatWeDo/WhatWeDoCardsMobile'
import WhatWeDoCardsDesktop from '@/components/WhatWeDo/WhatWeDoCardsDesktop'
export const Route = createLazyFileRoute('/what-we-do')({
  component: RouteComponent,
})

function RouteComponent() {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(0)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['clients'],
    queryFn: getPracticeAreas,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data || !Array.isArray(data)) return <div>No data available</div>

  const toggleDesktopCard = (index: number) => {
    setActiveCardIndex((prevIndex) => (prevIndex !== index ? index : prevIndex))
  }

  const toggleCard = (index: number) => {
    setOpenCardIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <>
      <div className="w-screen">
        <HeaderMain
          bgColor={'transparent'}
          darkOrLight="light"
          iconColor="white"
          isBlured={true}
          desktopHeaderBgColor="rgba(0,0,0,0.1)"
          desktopHeaderTextColor="white"
          desktopHeaderBgColor2="transparent"
        />
        <div
          style={{
            backgroundImage: `url(./public/what-we-do-bg-img.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="min-h-[460px]"
        ></div>
        <div className="w-full bg-white px-6 py-[85px] md:px-10 lg:px-12 xl:flex xl:justify-between xl:pl-16 xl:pr-12">
          <p className="text-[38px] leading-[1.2em] font-medium text-black mb-[50px] lg:max-w-[565px] xl:max-w-[570px] xl:text-[45px]">
            We provide legal services in every area of law practice since 1987
          </p>
          <WhatWeDoGridLayout />
        </div>
        <WhatWeDoCardsMobile
          data={data}
          openCardIndex={openCardIndex}
          toggleCard={toggleCard}
        />
        <WhatWeDoCardsDesktop
          data={data}
          activeCardIndex={activeCardIndex}
          toggleDesktopCard={toggleDesktopCard}
        />
      </div>
    </>
  )
}
