// FullScreenSwiper.tsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import { useQuery } from '@tanstack/react-query'
import QuotesFetch from '@/hooks/swiper'

interface Quotes {
  quote: string
  rating: number
  fullname: string
  position: string
}

const HomeSwiper = () => {
  const { data, isLoading, isError, error } = useQuery<Array<Quotes>>({
    queryKey: ['quotes'],
    queryFn: QuotesFetch,
  })

  if (isLoading) return <div>Loading ...</div>
  if (isError) return <div>error {error.message}</div>
  if (!data) return <div>no data avalibe on this time</div>
  return (
    <>
      <div className="w-full h-full">
        <div className=" w-full h-full lg:h-[965px] relative bg-[#4B2524] text-white overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full"
          >
            {data.map((quote: Quotes, index: number) => (
              <SwiperSlide
                key={index}
                className="flex flex-col items-start h-full w-full justify-center px-10 pb-15 lg:px-40 pt-20  "
              >
                <div className=" text-2xl md:text-4xl max-w-7xl leading-snug">
                  {quote.quote}
                </div>
                <div className="pt-5 text-lg">{quote.rating}</div>
                <div className="pt-3 text-xl font-semibold">
                  {quote.fullname}
                </div>
                <p className="text-sm">{quote.position}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ისრები */}
          <div className="absolute z-20 gap-4 -translate-y-1/2  right-2/8 top-2/7 hidden md:flex  md:right-1/8 md:top-5/6 lg:right-1/9 lg:top-2/6">
            <button className="custom-prev md:text-8xl font-light text-white">
              ←
            </button>
            <button className="custom-next text-8xl font-light text-white">
              →
            </button>
          </div>
        </div>

        {/* სურათის ქვედა ნაწილი — მარცხნივ დაბლარული, მარჯვნივ მკაფიო */}

        {/* მკაფიო მარჯვენა ნაწილი */}
        <div className="w-full h-fit flex justify-end lg:relative bottom-100">
          <img
            src="/public/slideblure-image.jpg"
            alt="clear"
            className=" top-10 lg:w-13/14 h-full object-cover"
          />
          <div className="absolute bottom-15 left-60 text-white text-lg z-20">
            Contributing Important <p>Global Initiatives</p>
          </div>
        </div>
      </div>
      {/* ტექსტი — overlay */}
    </>
  )
}

export default HomeSwiper
