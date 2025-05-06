import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'

type HeaderProps = {
  bgColor: string
  darkOrLight: string
  iconColor: string
}

export default function Header({
  bgColor,
  darkOrLight,
  iconColor,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPagesItemOpen, setIsPagesItemOpen] = useState(false)
  const [isPersonnelItemOpen, setIsPersonnelItemOpen] = useState(false)

  const pagesDropdownArray = [
    'About Us',
    'About Me',
    'What We Do',
    'Our Offices',
    'Our Clients',
    'FAQ Page',
    'Contact Us',
    'Coming Soon',
  ]

  const blogDropdownArray = ['Our Team', 'Our Expertise', 'Team Member']

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  const togglePagesItem = () => {
    setIsPersonnelItemOpen(false)
    setIsPagesItemOpen((prev) => !prev)
  }

  const togglePersonnelItem = () => {
    setIsPagesItemOpen(false)
    setIsPersonnelItemOpen((prev) => !prev)
  }

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="absolute w-screen z-100"
    >
      <div className="w-full flex items-center justify-between px-6 py-4">
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
            className={`block h-[2px] w-full bg-${iconColor} rounded transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
            } `}
          />
          <span
            className={`block h-[2px] w-full bg-${iconColor} rounded transition-all duration-300 my-1 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-1/2 bg-${iconColor} rounded transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 translate-y-[-7px] w-full' : ''
            }`}
          />
        </button>
      </div>

      <div
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
              {pagesDropdownArray.map((text) => (
                <p key={text} className="w-full cursor-pointer hover:underline">
                  {text}
                </p>
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
              {blogDropdownArray.map((text) => (
                <p key={text} className="w-full cursor-pointer hover:underline">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
