function WhatWeDoGridLayout() {
  const bannersArray = [
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon1.png',
      title: 'Real Estate',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon2.png',
      title: 'Business Immigration',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon3.png',
      title: 'International Desk',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon4.png',
      title: 'Private Companies',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon5.png',
      title: 'Criminal Law',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon6.png',
      title: 'Natural Resources',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon7.png',
      title: 'Corporate Tax',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon8.png',
      title: 'Private Walth',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon9.png',
      title: 'Work Injury',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon10.png',
      title: 'Venture Capital',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon11.png',
      title: 'Bankruptcy',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon12.png',
      title: 'Immigration',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon13.png',
      title: 'Wills And Inheritance',
    },
    {
      icon: 'https://dictum.qodeinteractive.com/wp-content/uploads/2024/10/h1-icon14.png',
      title: 'Charities',
    },
  ]

  return (
    <div className="w-full grid grid-cols-1 gap-y-[50px] md:grid-cols-2 lg:grid-cols-4 md:gap-x-[100px] md:ap-y-[50px] lg:gap-x-[20px] lg:gap-y-[50px] xl:grid-cols-3 xl:gap-x-[100px] xl:w-fit">
      {bannersArray.map((banner, index) => (
        <div
          key={index}
          className="w-[210px] flex flex-col items-start gap-y-[15px]"
        >
          <img
            src={banner.icon}
            alt={banner.title}
            className="w-[52px] h-[52px]"
          />
          <p className="text-[20px] leading-[1.2em] font-semibold text-black">
            {banner.title}
          </p>
          <p className="text-[16px] leading-[1.2em] text-black">
            Lorem ipsum dolor sit amet, consectetur elit, sed do
          </p>
        </div>
      ))}
    </div>
  )
}

export default WhatWeDoGridLayout
