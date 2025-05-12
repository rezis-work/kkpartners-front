import HeaderMain from '@/components/header/HeaderMain'
import WhatWeDoGridLayout from '@/components/WhatWeDoGridLayout'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/what-we-do')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="w-screen">
        <HeaderMain
          bgColor={'transparent'}
          darkOrLight="light"
          iconColor="white"
          isBlured={true}
          desktopHeaderBgColor="transparent"
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
      </div>
    </>
  )
}
