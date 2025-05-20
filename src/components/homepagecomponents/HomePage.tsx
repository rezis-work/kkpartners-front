import Banners from './Banner'
import HomeSlider from './swiper/HomeSlider'
import LawService from './LawServie'
import HistorySlider from './swiper/historySlide'

function HomePage() {
  return (
    <>
      <main>
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

        <HistorySlider />
      </main>
    </>
  )
}

export default HomePage
