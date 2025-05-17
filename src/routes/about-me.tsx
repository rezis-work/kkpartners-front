import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about-me')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="h-[600px] w-full overflow-hidden">
        <img
          src="/aboutmeimage/about-me-ta.jpg"
          alt="about me"
          className="h-full w-full object-cover object-[65%_center] "
        />
      </div>
      <div className=" mt-[100px] mx-[50px]">
        <h2 className="text-[25px] font-bold text-[30px]">
          Judith Hawkins
          <p className="text-gray-500 font-normal ">Attorney</p>
        </h2>
        <p className="text-gray-600 mt-4 text-[20px] lg:w-[40%]">
          Sed ut Perspiciatis unde Omnis Iste Sed ut Perspiciatis unde Omnis
          Iste
        </p>
      </div>

      <div className="space-y-10 mt-20 ">
        <ExperienceBlock
          company="Qode Interactive"
          date="2021–Current"
          title="Lead Marketing Expert"
          paragraphs={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
          ]}
        />

        <ExperienceBlock
          company="Qode Interactive"
          date="2018–2021"
          title="Certified Writer"
          paragraphs={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
          ]}
        />

        <ExperienceBlock
          company="IT Solutions"
          date="2015–2018"
          title="Certified Writer"
          paragraphs={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
          ]}
        />
      </div>
    </div>
  )
}

function ExperienceBlock({
  company,
  date,
  title,
  paragraphs,
}: {
  company: string
  date: string
  title: string
  paragraphs: Array<string>
}) {
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

        <h3 className="text-[25px] font-semibold mb-2 lg:mx-[50px]">{title}</h3>
        {paragraphs.map((text, idx) => (
          <p key={idx} className="text-gray-600 mb-2 lg:mx-[50px]">
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}
