import { createFileRoute } from '@tanstack/react-router'
import HeaderMain from '@/components/header/HeaderMain'
import AboutMeBlock from '@/components/AboutExperience'
import ExperienceBlock from '@/components/ExperienceBlock'
import { experiences } from '@/data/about-me-data'

export const Route = createFileRoute('/about-me')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-screen ">
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
          backgroundImage: `url(./public/aboutmeimage/about-me-ta.jpg)`,

          backgroundRepeat: 'no-repeat',
        }}
        className="h-[800px] object-cover object-[65%_center]"
      ></div>
      <div className="  mx-[50px]">
        <AboutMeBlock
          sign="Judith Hawkins Attorney"
          subtitle="Sed ut Perspiciatis unde Omnis Iste Sed ut Perspiciatis unde Omnis Iste"
        />
      </div>
      <div className="space-y-10 mt-20">
        {experiences.map((exp, idx) => (
          <ExperienceBlock key={idx} {...exp} />
        ))}
      </div>
    </div>
  )
}
