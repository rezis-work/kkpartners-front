import { createLazyFileRoute } from '@tanstack/react-router'
import HeaderMain from '@/components/header/HeaderMain'
import FooterComponent from '@/components/Footer'
import { useQuery } from '@tanstack/react-query'
import { getFaqs } from '@/api/getFaqs'
import { useState } from 'react'
export const Route = createLazyFileRoute('/faq-page')({
  component: RouteComponent,
})

function RouteComponent() {
  const [openCardIndex, setOpenCardIndex] = useState(null)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data || !Array.isArray(data)) return <div>No data available</div>
  return (
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
          backgroundImage: `url(./public/images/faq-page-bg-img.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="min-h-[460px]"
      ></div>
      <div className="max-w-[2000px] mx-auto">
        <div className="w-full mt-[80px] px-6 pb-[60px] md:px-9 lg:px-10 lg:flex lg:gap-x-[100px] lg:items-start xl:px-17 xl:pb-[80px] lg:mt-[50px]">
          <div>
            <h2 className="text-[38px] font-medium text-black mb-4 leading-[45px] lg:mt-[32px] lg:text-[48px] lg:max-w-[350px] lg:leading-[55px]">
              Frequently asked <span className="opacity-[0.5]">questions</span>
            </h2>
            <p className="text-black text-[18px] leading-[25px] font-normal max-w-[700px] mb-[30px] lg:mb-0 lg:text-[20px]">
              Sed ut Perspiciatis unde Omnis Iste Sed ut Pers piciatis unde
              Omnis Iste
            </p>
          </div>
          <div className="w-full">
            {data.map((faq, index) => (
              <div
                onClick={() =>
                  setOpenCardIndex(openCardIndex === index ? null : index)
                }
                className="w-full py-8 border-b border-gray-400"
                key={index}
              >
                <div className="w-full flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-x-6 pr-4">
                    <p className="text-black text-[16px] font-normal lg:text-[20px]">
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </p>
                    <p className="text-black text-[23px] font-normal lg:text-[28px]">
                      {faq.question}
                    </p>
                  </div>
                  <p className="text-blue-950 text-[28px] lg:text-[32px]">
                    {openCardIndex === index ? '-' : '+'}
                  </p>
                </div>
                <div className="overflow-hidden">
                  <div
                    className={`transform transition-all duration-600 ease-in-out px-[45px] pt-0 max-w-[650px] overflow-hidden lg:max-w-[800px] ${
                      openCardIndex === index
                        ? 'max-h-[500px] opacity-100 pt-4'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}
