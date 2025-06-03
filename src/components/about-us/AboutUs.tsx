import HeaderMain from '../header/HeaderMain'

export function AboutUs() {
  return (
    <div className="bg-[#f7f2ec]  ">
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
          backgroundImage: `url(./public/aboutusimage/ta-about-us.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="h-[600px]"
      ></div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Adaptibility', delay: '0' },
          { title: 'Customer Rights', delay: '75' },
          { title: 'Clients First', delay: '150' },
          { title: 'Civil Law', delay: '225' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="group relative bg-[#f7f2ec] px-4 py-[100px] text-center overflow-hidden"
          >
            <span
              className={`absolute left-0 top-0 h-full w-0 bg-[#442221] transition-all duration-500 ease-in-out group-hover:w-full z-0`}
              style={{ transitionProperty: 'width' }}
            ></span>

            <div className="relative z-10 transition-colors duration-300 group-hover:text-white">
              <h3 className="text-lg font-semibold mb-2 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm transition-colors duration-300">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className=" mt-20 lg:mt-40 lg:grid grid-cols-2 mx-[30px] md:mx-[130px] gap-[20px]">
        <div>
          <h2 className="text-[32px] font-bold">
            Legal services in every area
            <span className="text-[grey]"> of law practice </span>
          </h2>
          <p className="text-[22px] mt-[30px] md:mr-[200px]">
            Sed ut Perspiciatis unde Omnis Iste Sed ut Pers piciatis unde Omnis
            Iste
          </p>
          <p className=" mt-[50px] lg:mt-[300px] w-[250px]">
            Free Custom Domain Web & Mobile Outstanding Supper Customer Best
            Hosting Ever Outstanding Support
          </p>
        </div>
        <div className="flex justify-center my-10">
          <div className="w-full max-w-[720px] aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/lyIDQmpecZE?autoplay=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
