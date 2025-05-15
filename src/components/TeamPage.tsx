import { useEffect, useState } from 'react'
import { getPartners } from '../api/getOurPartners'
import type { Partner as ApiPartner } from '../api/getOurPartners'
import HeaderMain from './header/HeaderMain'

// Utilizziamo l'interfaccia Partner dall'API
type Partner = ApiPartner

export function TeamPage() {
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    getPartners().then(setPartners)
  }, [])

  return (
    <>
      <HeaderMain />

      <div className="p-6 max-w-6xl  pt-24  mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Meet our team</h1>
          <p className="text-gray-600">Lorem ipsum dolor sit amet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Zoe Block */}
          <div>
            <img
              src={'./public/images/zoe-docker.jpg'}
              className="w-full max-w-sm rounded mb-4"
            />
            <h2 className="text-2xl font-semibold mb-1">
              Zoe Decker & associates
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner._id || `partner-${partner.fullname}`}
                className="p-4 bg-white"
              >
                <img
                  src={partner.image}
                  alt={partner.fullname}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-medium">{partner.fullname}</h3>
                <p className="text-gray-500">{partner.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
