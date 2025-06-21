import { createRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { CiFacebook } from 'react-icons/ci'
import { FaLinkedinIn, FaPinterestP } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import Message from '../components/Message'
import { Map } from '../components/Map'
import AddressCard from '../components/AddressCard'

import { fetchAddresses } from '../api/address'
import { rootRoute } from './__root'
import type { Address } from '../api/address'
import 'leaflet/dist/leaflet.css'
import HeaderMain from '@/components/header/HeaderMain'
import FooterComponent from '@/components/Footer'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
})

function Contact() {
  const [addresses, setAddresses] = useState<Array<Address>>([])

  useEffect(() => {
    const loadAddresses = async () => {
      const data = await fetchAddresses()
      setAddresses(data)
    }

    loadAddresses()
  }, [])

  return (
    <div className="text-black w-full z-10 h-full ">
      <div className="w-full z-10">
        <HeaderMain
          bgColor={'transparent'}
          darkOrLight="dark"
          iconColor="dark"
          isBlured={true}
          desktopHeaderBgColor="transparent"
          desktopHeaderTextColor="dark"
          desktopHeaderBgColor2="transparent"
        />
      </div>
      <div className="p-4 bg-[#f5f5f5] pb-[100px] w-full pt-40 z-0 ">
        <Map />

        <div className="mt-[100px] lg:grid grid-cols-2 lg:gap-30 md:mx-[45px]">
          <div>
            <h2 className="text-[27px] md:text-[35px] lg:text-[35px] lg:font-bold text-left">
              Our world office
              <span className="block text-[grey]">locations</span>
            </h2>
            <p className="mt-[20px] text-left">
              Sed ut Perspiciatis unde Omnis Iste Sed ut Pers piciatis unde
              Omnis Iste
            </p>

            <div className="mt-[40px] grid grid-cols-2 gap-4">
              {addresses.map((address) => (
                <AddressCard key={address._id} {...address} />
              ))}

              <div className="mt-[15px]">
                <h3 className="font-bold text-[20px]">Follow Us</h3>
                <div className="flex gap-3 mt-[20px]">
                  <CiFacebook />
                  <FaXTwitter />
                  <FaLinkedinIn />
                  <FaPinterestP />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[20px] grid grid-cols-1 lg:grid-cols-2 gap-10 ">
            <div>
              <h3 className="font-bold text-[25px]">Leave A Message</h3>
              <Message />
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}
