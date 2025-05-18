interface About {
  company: string
  date: string
  title: string
  paragraphs: Array<string>
}

export default function ExperienceBlock({
  company,
  date,
  title,
  paragraphs,
}: About) {
  return (
    <div className="relative pl-10 ml-[25px] mb-26 lg:flex lg:pl-5 lg:ml-15 lg:items-start">
      <div className="hidden lg:block lg:w-1/3 lg:text-right lg:pr-15">
        <p className="text-[15px] lg:text-[17px] font-medium text-gray-700 mb-1">
          {company}
          <br />
          {date}
        </p>
      </div>

      <div className="absolute left-0 top-1 lg:static lg:flex lg:flex-col lg:items-center lg:mx-4">
        <div className="w-3 h-3 bg-gray-800 rounded-full z-10" />
        <div className="hidden lg:block w-px flex-grow bg-gray-400" />
      </div>

      <div className="lg:w-2/3 mt-4 lg:mt-0">
        <div className="lg:hidden mb-2 text-sm font-medium text-gray-700">
          {company}
          <br />
          {date}
        </div>

        <h3 className="text-[25px] font-semibold mb-2 mx-[20px] lg:mx-[50px]">
          {title}
        </h3>
        {paragraphs.map((text, idx) => (
          <p key={idx} className="text-gray-600 mb-2 mx-[20px] lg:mx-[50px]">
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}
