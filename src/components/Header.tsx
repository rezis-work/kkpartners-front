import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
type HeaderProps = {
  bgColor: string
}

export default function Header({ bgColor }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPagesItemOpen, setIsPagesItemOpen] = useState(false)
  const [isPersonnelItemOpen, setIsPersonnelItemOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const [shouldPagesItemRender, setShouldPagesItemRender] = useState(false)
  const [shouldPersonnelRender, setShouldPersonnelRender] = useState(false)

  const togglePagesItem = () => {
    setIsPersonnelItemOpen(false)
    if (!isPagesItemOpen) {
      setShouldPagesItemRender(true)

      setTimeout(() => {
        setIsPagesItemOpen(true)
      }, 20)
    } else {
      setIsPagesItemOpen(false)

      setTimeout(() => {
        setShouldPagesItemRender(false)
      }, 500)
    }
  }

  const togglePersonnelItem = () => {
    setIsPagesItemOpen(false)

    if (!isPersonnelItemOpen) {
      setShouldPersonnelRender(true)

      setTimeout(() => {
        setIsPersonnelItemOpen(true)
      }, 30)
    } else {
      setIsPersonnelItemOpen(false)

      setTimeout(() => {
        setShouldPersonnelRender(false)
      }, 500)
    }
  }
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="absolute w-screen z-100"
    >
      <div className="w-full flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img className="h-[38px]" src="./public/logo-light.png" />
        </Link>
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-start h-8 w-10 relative z-50 group cursor-pointer"
        >
          <span
            className={`block h-[2px] w-full bg-white rounded transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
            } `}
          />
          <span
            className={`block h-[2px] w-full bg-white rounded transition-all duration-300 my-1 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-1/2 bg-white rounded transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 translate-y-[-7px] w-full' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`w-full bg-white py-6 px-5 overflow-hidden transition-all duration-600 ease-in-out ${
          isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        } flex flex-col`}
      >
        <Link to="/">
          <div className="w-full flex items-center justify-between text-#291616 cursor-pointer group">
            <p className="text-[15px] font-bold group-hover:underline">Home</p>
          </div>
        </Link>
        <div className="w-full flex items-center justify-between text-#291616 cursor-pointer mt-5 group">
          <p className="text-[15px] font-bold group-hover:underline">Blog</p>
        </div>
        <div
          onClick={togglePagesItem}
          className="w-full flex items-center justify-between text-#291616 cursor-pointer group mt-5"
        >
          <p className="text-[15px] font-bold group-hover:underline">Pages</p>
          <HiArrowUpRight
            className="transition-all duration-500 ease-in-out"
            style={
              isPagesItemOpen
                ? { transform: 'rotate(90deg)' }
                : { transform: 'rotate(0)' }
            }
          />
        </div>

        {shouldPagesItemRender && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isPagesItemOpen
                ? 'max-h-[500px] opacity-100'
                : 'max-h-0 opacity-0'
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
        )}
        <div
          onClick={togglePersonnelItem}
          className="w-full flex items-center justify-between text-#291616 cursor-pointer group mt-5"
        >
          <p className="text-[15px] font-bold group-hover:underline">
            Personnel
          </p>
          <HiArrowUpRight
            className="transition-all duration-500 ease-in-out"
            style={
              isPersonnelItemOpen
                ? { transform: 'rotate(90deg)' }
                : { transform: 'rotate(0)' }
            }
          />
        </div>

        {shouldPersonnelRender && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isPersonnelItemOpen
                ? 'max-h-[500px] opacity-100'
                : 'max-h-0 opacity-0'
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
        )}
      </div>
    </div>
  )
}
