import { createFileRoute } from '@tanstack/react-router'

import { useEffect, useState } from 'react'
import { IoCallOutline, IoLocationSharp } from 'react-icons/io5'

import Message from '../components/Message'
import { Map } from '../components/Map'
import AddressCard from '../components/AddressCard'

import { fetchAddresses } from '../api/address'
import { rootRoute } from './__root'
import type { Address } from '../api/address'
import 'leaflet/dist/leaflet.css'

export const Route = createFileRoute('/our-offices')({
  component: RouteComponent,
})

function RouteComponent() {
  const [addresses, setAddresses] = useState<Array<Address>>([])

  useEffect(() => {
    const loadAddresses = async () => {
      const data = await fetchAddresses()
      setAddresses(data)
    }

    loadAddresses()
  }, [])
  return (
    <div className="">
      <div className="relative w-full ">
        <img
          src="our-offices-image/h1-img6.jpg"
          alt="our-offices-image"
          className="w-full h-250 object-cover"
        />

        <div className="absolute top-20 left-1/2 m-auto -translate-x-1/2 md:h-150 lg:mt-[100px] lg:right-auto lg:translate-x-3 lg:h-180   h-180 bg-black/70 text-white">
          <div className=" lg:p-12  p-4 ">
            <div>
              <h2 className="text-[30px] font-bold mb-4">
                Contact Us{' '}
                <span className="text-[30px] text-gray-400">Get in Touch</span>
              </h2>

              <p className="flex items-center gap-2 mb-2 mt-[40px] text-white">
                <IoLocationSharp className=" text-xl" />
                Old Westbury 256, New York 11201, USA
              </p>

              <p className="flex items-center gap-2 text-white">
                <IoCallOutline className="text-white text-xl" />
                +123 456 789 000
              </p>
            </div>
          </div>

          <div className="w-full  flex items-center justify-center p-16 lg:p-22 ">
            <Message />
          </div>
        </div>
      </div>
      <h3 className="mx-[40px] mt-35 text-[30px] font-bold">Our Offices</h3>

      <div className=" ml-[40px] mt-15 lg:flex flex-row gap-50">
        {addresses.map((address) => (
          <AddressCard key={address._id} {...address} />
        ))}
      </div>

      <div className="mt-30">
        <Map />
      </div>
    </div>
  )
}
