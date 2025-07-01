import { IoCallOutline, IoLocationSharp } from 'react-icons/io5'

import UserMessages from '../UserMessages'

import Banners from './Banner'
import HomeSlider from './swiper/HomeSlider'
import LawService from './LawServie'
import HistorySlider from './swiper/historySlide'

import HomeTeam from './HomeTeam'

import LatestNewsBlogs from './LatestNews'
import ScrollButt from '../scrollButt'
import FooterComponent from '../Footer'

function HomePage() {
  const scrollToTop = () => {
    const element = document.getElementById('homepage')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <main id="homepage">
        <div className="w-full">
          <Banners />
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* მარცხენა სურათი – responsive და სრული ზომა */}
            <div className="block w-full  lg:sticky lg:top-0 lg:self-start lg:h-auto">
              <div className="w-full h-full">
                <img
                  src="../../../homepageImages/backgroundimage.jpg"
                  alt="background"
                  className="w-full h-screen object-cover"
                />
              </div>
            </div>

            {/* მარჯვენა content */}
            <div className="pb-10">
              <h2 className="pt-20 text-3xl sm:text-4xl pl-10 pr-5 lg:text-5xl lg:pb-10 font-bold max-w-[600px]">
                We provide legal services in every area of law practice since
                1987
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 lg:pl-10">
                {LawService.map((icons, index) => (
                  <div className="pt-4 pl-4" key={index}>
                    <img className="w-12 h-12" src={icons.icon} alt="icon" />
                    <p className="font-black pt-2">{icons.headText}</p>
                    <p className="w-full pr-4">{icons.context}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <HomeSlider />
        <HomeTeam />
        <HistorySlider />
        <LatestNewsBlogs />
        <div
          style={{
            backgroundImage: `url(./public/our-offices-image/h1-img6.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="h-[1000px] relative"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:h-150 lg:mt-[100px] lg:right-auto lg:translate-x-0 lg:h-180 h-180 bg-black/70 text-white">
            <div className="lg:p-12 p-4">
              <h2 className="text-[30px] font-bold mb-4">
                Contact Us{' '}
                <span className="text-[30px] text-gray-400">Get in Touch</span>
              </h2>
              <p className="flex items-center gap-2 mb-2 mt-[40px] text-white">
                <IoLocationSharp className="text-xl" />
                Old Westbury 256, New York 11201, USA
              </p>
              <p className="flex items-center gap-2 text-white">
                <IoCallOutline className="text-white text-xl" />
                +123 456 789 000
              </p>
            </div>
            <div className="w-full flex items-center justify-center p-4 lg:p-8">
              <UserMessages />
            </div>
          </div>
        </div>

        {/* Scroll to top button at bottom left */}

        <ScrollButt id="homepage" />
      </main>
      <div className="fixed bottom-20 right-4 z-50 ">
        <button
          onClick={scrollToTop}
          className="bg-amber-950  text-white px-4 py-2 shadow-lg transition cursor-pointer w-[60px] h-[60px] text-2xl"
        >
          ↑
        </button>
      </div>
      <FooterComponent />
    </>
  )
}

export default HomePage
