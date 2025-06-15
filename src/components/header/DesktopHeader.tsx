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
    { pageName: 'Contact Us', pageLink: '/contact' },
    { pageName: 'Coming Soon', pageLink: '/coming-soon' },
    { pageName: 'Dishboard', pageLink: '/_authenticated/dashboard' },
    { pageName: 'message', pageLink: '/_authenticated/message' },
    { pageName: 'Dashboard', pageLink: '/dashboard' },
  ]

  const personelDropdownArray = [
    { pageName: 'Our Team', pageLink: '/our-team' },
    { pageName: 'Our Expertise', pageLink: '/our-expertise' },
    { pageName: 'Team member', pageLink: '/team-bio' },
  ]
  return (
    <>
      {/* Desktop header */}
      <div
        className={`hidden lg:flex items-center justify-between w-full px-12 py-2 absolute z-100 box-border ${isBlured ? 'backdrop-blur-sm' : 'backdrop-blur-none'}`}
        style={isBlured ? { backgroundColor: desktopHeaderBgColor } : {}}
      >
        <div className="flex items-center gap-2">
          <Link
            to="/our-team"
            className={`text-[15px] text-${desktopHeaderTextColor} hover:underline`}
          >
            Our Attorneys
          </Link>
          <p className="text-[15px] text-gray-500">|</p>
          <Link
            to="/faq-page"
            className={`text-[15px] text-${desktopHeaderTextColor} hover:underline`}
          >
            FAQ
          </Link>
          <p className="text-[15px] text-gray-500">|</p>
          <Link
            to="/our-expertise"
            className={`text-[15px] text-${desktopHeaderTextColor} hover:underline`}
          >
            Our Expertise
          </Link>
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
            <Link to="/" className="hover:underline">
              Home
            </Link>

            <Link to="/coming-soon" className="hover:underline">
              Blog
            </Link>

            <div className="relative group">
              <Link
                to="/about-us"
                className="hover:underline leading-[80px] block"
              >
                Pages
              </Link>

              <div className="absolute left-0 top-full w-48 bg-white text-black shadow-md rounded p-3 opacity-1 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[15px]">
                {pagesDropdownArray.map((page) => (
                  <Link
                    to={page.pageLink}
                    key={page.pageName}
                    className="block hover:underline py-1"
                  >
                    {page.pageName}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <Link
                to="/our-team"
                className="hover:underline leading-[80px] block"
              >
                Personnel
              </Link>
              <div className="absolute left-0 top-full w-48 bg-white text-black shadow-md rounded p-3 opacity-1 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[15px]">
                {personelDropdownArray.map((page) => (
                  <Link
                    to={page.pageLink}
                    key={page.pageName}
                    className="block hover:underline py-1"
                  >
                    {page.pageName}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/auth" className="hover:underline">
              auth
            </Link>

            <Link to="/dashboard" className="hover:underline">
              dashboard
            </Link>
          </div>
          <Link
            to="/contact"
            className="bg-white px-6 py-3 font-semibold text-[15px] hover:underline"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  )
}

export default DesktopHeader
