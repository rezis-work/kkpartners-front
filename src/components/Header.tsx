import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import { IoTimeOutline } from 'react-icons/io5'
import { MdOutlineEmail } from 'react-icons/md'

type HeaderProps = {
  bgColor: string
  darkOrLight: string
  iconColor: string
  isBlured?: boolean
  desktopHeaderBgColor?: string
  desktopHeaderTextColor?: string
  desktopHeaderBgColor2?: string
}

export default function Header({
  bgColor,
  darkOrLight,
  iconColor,
  isBlured,
  desktopHeaderBgColor,
  desktopHeaderTextColor,
  desktopHeaderBgColor2,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPagesItemOpen, setIsPagesItemOpen] = useState(false)
  const [isPersonnelItemOpen, setIsPersonnelItemOpen] = useState(false)

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
      {/* Mobile menu dropdown */}
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
              <p className="w-full cursor-pointer hover:underline">About Us</p>

              <p className="w-full cursor-pointer hover:underline">About Me</p>

              <p className="w-full cursor-pointer hover:underline">
                What We Do
              </p>

              <p className="w-full cursor-pointer hover:underline">
                Our Offices
              </p>

              <p className="w-full cursor-pointer hover:underline">
                Our Clients
              </p>

              <p className="w-full cursor-pointer hover:underline">FAQ Page</p>

              <p className="w-full cursor-pointer hover:underline">
                Contact Us
              </p>

              <p className="w-full cursor-pointer hover:underline">
                Coming Soon
              </p>
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
              <p className="w-full cursor-pointer hover:underline">Our Team</p>

              <p className="w-full cursor-pointer hover:underline">
                Our Expertise
              </p>

              <p className="w-full cursor-pointer hover:underline">
                Team Member
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Header */}
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
                <p className="hover:underline cursor-pointer py-1 ">About Us</p>
                <p className="hover:underline cursor-pointer py-1">About Me</p>
                <p className="hover:underline cursor-pointer py-1">
                  What We Do
                </p>
                <p className="hover:underline cursor-pointer py-1">
                  Our Offices
                </p>
                <p className="hover:underline cursor-pointer py-1">
                  Our Clients
                </p>
                <p className="hover:underline cursor-pointer py-1">FAQ Page</p>
                <p className="hover:underline cursor-pointer py-1">
                  Contact Us
                </p>
                <p className="hover:underline cursor-pointer py-1">
                  Coming Soon
                </p>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <p className="hover:underline leading-[80px]">Personnel</p>
              <div className="absolute left-0 top-full w-48 bg-white text-black shadow-md rounded p-3 opacity-1 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-[15px]">
                <p className="hover:underline cursor-pointer py-1">Our Team</p>
                <p className="hover:underline cursor-pointer py-1">
                  Our Expertise
                </p>
                <p className="hover:underline cursor-pointer py-1">
                  Team Member
                </p>
              </div>
            </div>
          </div>
          <button className="bg-white px-6 py-3 font-semibold text-[15px] cursor-pointer hover:underline">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  )
}
