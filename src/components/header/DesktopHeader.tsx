import { Link } from '@tanstack/react-router'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlineEmail } from 'react-icons/md'
import type { HeaderProps } from './HeaderMain'

function DesktopHeader({
  isBlured,
  desktopHeaderBgColor,
  desktopHeaderTextColor,
  desktopHeaderBgColor2,
  darkOrLight,
}: HeaderProps) {
  const pagesDropdownArray = [
    { pageName: 'About Us', pageLink: '/about-us' },
    { pageName: 'About Me', pageLink: '/about-me' },
    { pageName: 'What We Do', pageLink: '/what-we-do' },
    { pageName: 'Our Offices', pageLink: '/our-offices' },
    { pageName: 'Our Clients', pageLink: '/our-clients' },
    { pageName: 'FAQ Page', pageLink: '/faq-page' },
    { pageName: 'Contact Us', pageLink: '/contact-us' },
    { pageName: 'Coming Soon', pageLink: '/coming-soon' },
  ]

  const personelDropdownArray = [
    { pageName: 'Our Team', pageLink: '/our-team' },
    { pageName: 'Our Expertise', pageLink: '/our-expertise' },
    { pageName: 'Team member', pageLink: '/team-meber' },
  ]
  return (
    <>
      {/* Desktop header */}
      <div
        className={`hidden lg:flex items-center justify-between w-full px-12 py-2 absolute z-100 ${isBlured ? 'backdrop-blur-sm' : 'backdrop-blur-none'}`}
        style={isBlured ? { backgroundColor: desktopHeaderBgColor } : {}}
      >
        <div className="flex items-center gap-2">
          <p
            className={`text-[15px] text-${desktopHeaderTextColor} cursor-pointer hover:underline`}
          >
            Our Attorneys
          </p>
          <p className="text-[15px] text-gray-500">|</p>
          <p
            className={`text-[15px] text-${desktopHeaderTextColor} cursor-pointer hover:underline`}
          >
            FAQ
          </p>
          <p className="text-[15px] text-gray-500">|</p>
          <p
            className={`text-[15px] text-${desktopHeaderTextColor} cursor-pointer hover:underline`}
          >
            Our Expertise
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <IoTimeOutline
              className={`mt-[3.5px] text-${desktopHeaderTextColor}`}
            />
            <p className={`text-[15px] text-${desktopHeaderTextColor}`}>
              Mon - Fri: 8:00 - 16:00
            </p>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineEmail
              className={`mt-[3.5px] text-${desktopHeaderTextColor}`}
            />
            <p className={`text-[15px] text-${desktopHeaderTextColor}`}>
              dictum@example.com
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: desktopHeaderBgColor2 }}
        className={`hidden lg:flex items-center justify-between w-full absolute px-12 top-[38px] z-100`}
      >
        <Link to="/">
          <img
            src={`./public/logo-${darkOrLight}.png`}
            alt="Logo"
            className="h-[60px] cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-[40px]">
          <div
            style={{ color: desktopHeaderTextColor }}
            className="flex items-center gap-[40px] text-[18px] font-semibold"
          >
            <Link to="/">
              <p className="cursor-pointer hover:underline">Home</p>
            </Link>
            <p className="cursor-pointer hover:underline">Blog</p>

            <div className="relative group cursor-pointer">
              <p className="hover:underline leading-[80px]">Pages</p>
              <div className="absolute left-0 top-full w-48 bg-white text-black shadow-md rounded p-3 opacity-1 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[15px]">
                {pagesDropdownArray.map((page) => (
                  <Link to={page.pageLink} key={page.pageName}>
                    <p className="hover:underline cursor-pointer py-1">
                      {page.pageName}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <p className="hover:underline leading-[80px]">Personnel</p>
              <div className="absolute left-0 top-full w-48 bg-white text-black shadow-md rounded p-3 opacity-1 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[15px]">
                {personelDropdownArray.map((page) => (
                  <Link to={page.pageLink} key={page.pageName}>
                    <p className="hover:underline cursor-pointer py-1">
                      {page.pageName}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <button className="bg-white px-6 py-3 font-semibold text-[15px] cursor-pointer hover:underline">
            Get in touch
          </button>
        </div>
      </div>
    </>
  )
}

export default DesktopHeader
