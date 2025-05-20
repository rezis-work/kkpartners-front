import { useEffect, useState } from 'react'
import Content from './historySwiper'
import 'swiper/css'
import 'swiper/css/navigation'

function HistorySlider() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // ავტომატური გადასვლა ყოველი 3 წამში
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) =>
        prevIndex === Content.length - 1 ? 0 : prevIndex + 1,
      )
    }, 3000)

    // დასუფთავება ინტერვალის when component unmounts
    return () => clearInterval(interval)
  }, [])

  const selectedHistory = Content[selectedIndex]

  return (
    <>
      <div className="w-full h-full flex flex-col py-15  space-y-6 ">
        <div className="grid space-x-6 items-center w-full  lg:flex">
          {/* სურათი მარცხნივ */}
          <div className="w-full lg:w-1/2 h-full">
            <img
              src={selectedHistory.image}
              alt={selectedHistory.headText}
              className="w-full h-full object-cover rounded-lg shadow-lg lg:h-[80vh]  2xl:h-full"
            />
          </div>

          {/* ტექსტი მარჯვნივ */}
          <div className=" w-full pt-6 lg:w-1/2 flex flex-col space-y-4">
            {Content.map((history, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer p-4 rounded-md transition-colors duration-300 ${
                  selectedIndex === index
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <h2 className="text-xl font-semibold">{history.headText}</h2>
                <h3 className="text-md text-gray-500">{history.date}</h3>
                <p className="text-gray-700 mt-2">{history.context}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HistorySlider
