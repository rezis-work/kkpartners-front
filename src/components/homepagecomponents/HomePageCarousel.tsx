import { useQuery } from '@tanstack/react-query'
import { getCarouselData } from '@/api/getCarouselData'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../../globalStyles.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Link } from '@tanstack/react-router'

function HomePageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['carousel'],
    queryFn: getCarouselData,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data || !Array.isArray(data)) return <div>No data available</div>

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
  }

  return (
    <div>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        {data.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <img src={slide.image} alt={slide.title} />
            <motion.div
              className="absolute top-[150px] left-6 right-6 z-10 flex flex-col items-start xl:left-12 xl:right-12 xl:top-[200px]"
              initial={{ opacity: 0, x: -100 }}
              animate={
                activeIndex === index
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -100 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.h1
                className="text-white text-[52px] leading-[52px] font-normal font-lora mb-[30px] max-w-[400px] xl:max-w-[750px] xl:text-[72px] xl:leading-[72px]"
                initial={{ opacity: 0, x: -100 }}
                animate={
                  activeIndex === index
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -100 }
                }
                transition={{ duration: 0.6 }}
              >
                {slide.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={
                  activeIndex === index
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -100 }
                }
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/contact">
                  <RiArrowRightUpLine className="w-[125px] h-[125px] text-white" />
                </Link>
              </motion.div>
              {/* Progress Bar */}
              <div className="hidden lg:block w-[800px] h-[3px] bg-gray-500 mt-[-30px] mb-6 relative overflow-hidden">
                <motion.div
                  className="h-full bg-white absolute left-0 top-0"
                  initial={{ width: '0%' }}
                  animate={
                    activeIndex === index ? { width: '100%' } : { width: '0%' }
                  }
                  transition={{
                    duration: 3,
                    ease: 'linear',
                    repeatDelay: 0,
                  }}
                />
              </div>
              <motion.div className="hidden lg:flex items-center justify-between w-[800px]">
                <div className="flex items-center gap-x-6">
                  <Link to={slide.link1}>
                    <div className="flex items-center gap-x-1 border-b border-white cursor-pointer">
                      <p className="text-[16px] text-white">Corporate Law</p>
                      <RiArrowRightUpLine className="text-white" />
                    </div>
                  </Link>
                  <Link to={slide.link1}>
                    <div className="flex items-center gap-x-1 border-b border-white cursor-pointer">
                      <p className="text-[16px] text-white">
                        Banking & Finance
                      </p>
                      <RiArrowRightUpLine className="text-white" />
                    </div>
                  </Link>
                </div>
                <p className="text-white text-[20px] text-left max-w-[300px]">
                  {slide.subtitle}
                </p>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomePageCarousel
