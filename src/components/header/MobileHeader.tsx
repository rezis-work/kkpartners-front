import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import type { HeaderProps } from './HeaderMain'

function MobileHeader({ darkOrLight, iconColor }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPagesItemOpen, setIsPagesItemOpen] = useState(false)
  const [isPersonnelItemOpen, setIsPersonnelItemOpen] = useState(false)

  const togglePagesItem = () => {
    setIsPersonnelItemOpen(false)
    setIsPagesItemOpen((prev) => !prev)
  }

  const togglePersonnelItem = () => {
    setIsPagesItemOpen(false)
    setIsPersonnelItemOpen((prev) => !prev)
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

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
      {/* Mobile Header */}
      <div className="w-full flex items-center justify-between px-6 py-4 lg:hidden">
        <Link to="/">
          <img
            className="h-[38px]"
            src={`./public/logo-${darkOrLight}.png`}
            alt="Logo"
          />
        </Link>
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-start h-8 w-10 relative z-50 group cursor-pointer"
        >
          <span
            style={{ backgroundColor: iconColor }}
            className={`block h-[2px] w-full rounded transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
            } `}
          />
          <span
            style={{ backgroundColor: iconColor }}
            className={`block h-[2px] w-full rounded transition-all duration-300 my-1 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            style={{ backgroundColor: iconColor }}
            className={`block h-[2px] w-1/2 rounded transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 translate-y-[-7px] w-full' : ''
            }`}
          />
        </button>
      </div>
      {/* Mobile menu dropdown */}
      <div
        style={{ borderBottom: '1px solid lightGray' }}
        className={` transform transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[800px] opacity-100 pointer-events-auto' : ' max-h-0 opacity-0 pointer-events-none'} `}
      >
        <div className={`w-full bg-white py-6 px-5 flex flex-col`}>
          <Link to="/">
            <div className="w-full flex items-center justify-between text-[#291616] cursor-pointer group">
              <p className="text-[15px] font-bold group-hover:underline">
                Home
              </p>
            </div>
          </Link>

          <div className="w-full flex items-center justify-between text-[#291616] cursor-pointer mt-5 group">
            <p className="text-[15px] font-bold group-hover:underline">Blog</p>
          </div>

          <div
            onClick={togglePagesItem}
            className="w-full flex items-center justify-between text-[#291616] cursor-pointer mt-5 group"
          >
            <p className="text-[15px] font-bold group-hover:underline">Pages</p>
            <HiArrowUpRight
              className="transition-transform duration-500 ease-in-out"
              style={{
                transform: isPagesItemOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            />
          </div>

          <div
            className={`transition-all duration-500 ease-in-out transform ${
              isPagesItemOpen
                ? 'translate-y-0 opacity-100 max-h-[1000px]'
                : '-translate-y-3 opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            <div className="flex flex-col items-start gap-y-3 text-[15px] py-4">
              {pagesDropdownArray.map((page) => (
                <Link to={page.pageLink} key={page.pageName}>
                  <p className="w-full cursor-pointer hover:underline">
                    {page.pageName}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div
            onClick={togglePersonnelItem}
            className="w-full flex items-center justify-between text-[#291616] cursor-pointer mt-5 group"
          >
            <p className="text-[15px] font-bold group-hover:underline">
              Personnel
            </p>
            <HiArrowUpRight
              className="transition-transform duration-500 ease-in-out"
              style={{
                transform: isPersonnelItemOpen
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
              }}
            />
          </div>

          <div
            className={`transition-all duration-500 ease-in-out transform ${
              isPersonnelItemOpen
                ? 'translate-y-0 opacity-100 max-h-[1000px]'
                : '-translate-y-3 opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            <div className="flex flex-col items-start gap-y-3 text-[15px] py-4">
              {personelDropdownArray.map((page) => (
                <Link to={page.pageLink} key={page.pageName}>
                  <p className="w-full cursor-pointer hover:underline">
                    {page.pageName}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileHeader
