import { useEffect, useState } from 'react'
import { getPartners } from '../api/getOurPartners'
import type { Partner as ApiPartner } from '../api/getOurPartners'
// import HeaderMain from './header/HeaderMain'
import PartnerCard from './PartnerCard'
import DesktopHeader from './header/DesktopHeader'

type Partner = ApiPartner

export function TeamPage() {
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    getPartners().then(setPartners)
  }, [])

  return (
    <>
      <DesktopHeader />

      <div className="p-6  max-w-6xl pt-24 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl text-[#291616] font-semibold mb-4">Meet our team</h1>
          <p className="text-[#291616] pt-6">Lorem ipsum dolor sit amet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[0.4fr_0.6fr] pt-15 gap-8 items-start">
          {/* Zoe Block */}
          <div className="w-full max-w-[400px]">
            <img
              src={'./public/images/zoe-docker.jpg'}
              className="w-full mb-2"
            />
            <h2 className="text-2xl text-[#291616] font-semibold mb-2">
              Zoe Decker & associates
            </h2>
            <p className="text-[#291616] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </p>

            <a
              href="https://dictum.qodeinteractive.com/our-expertise/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 group"
            >
              <span className="relative text-sm font-medium cursor-pointer select-none">
                Join Our Team
                <span className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-black transition-opacity duration-200 group-hover:opacity-0 group-hover:animate-fadeIn"></span>
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9.795 9.751"
                className="w-2 h-2 text-gray-600 transition-opacity duration-200 group-hover:opacity-0 group-hover:animate-fadeIn"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
              >
                <g strokeLinecap="round" strokeLinejoin="round">
                  <path d="m 0.35 9.4 l 8.94 -8.91" />
                  <path d="M 0.4 0.5 h 8.88" />
                  <path d="M 9.3 9.2 V 0.49" />
                </g>
              </svg>
            </a>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {partners.map((partner) => (
              <PartnerCard
                key={partner._id || `partner-${partner.fullname}`}
                id={partner._id}
                image={partner.image}
                fullname={partner.fullname}
                position={partner.position}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
