import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { getPartnerById } from '../api/getOurPartners'
import HeaderMain from './header/HeaderMain'
import Footer from './Footer'

import PartnerSkeleton from './PartnerSkeleton'

export function PartnerBioPage() {
  const { id } = useParams({ from: '/team-bio/$id' })

  const { data: partner, isLoading } = useQuery({
    queryKey: ['partner', id],
    queryFn: () => getPartnerById(id),
  })

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <PartnerSkeleton />
      </div>
    )
  if (!partner) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <div>
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Partner not found
          </h2>
          <p className="text-gray-600">
            The partner you’re looking for does not exist or was removed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-x-hidden relative">
      <HeaderMain
        bgColor={'transparent'}
        darkOrLight="light"
        iconColor="white"
        isBlured={true}
        desktopHeaderBgColor="rgba(0,0,0,0.1)"
        desktopHeaderTextColor="white"
        desktopHeaderBgColor2="transparent"
      />

      {/*  პირველი სექცია */}
      <div
        className="relative w-full min-h-screen  bg-contain bg-center text-white px-4 lg:px-10 py-40"
        style={{ backgroundImage: `url(${partner.cover})` }}
      >
        {/* img */}
        <div className="flex flex-col lg:flex-row items-start gap-10">
          <div className="flex justify-center lg:justify-end w-full lg:w-auto">
            <img
              src={partner.image}
              alt={partner.fullname}
              className="w-50 bg-no-repeat  sm:w-72 md:w-80 h-[300px] sm:h-[400px] md:h-[500px] object-cover lg:absolute lg:top-40 lg:right-20 lg:bg-no-repeat "
            />
          </div>

          {/* Text Section */}
          <div className="max-w-xl space-y-6 mt-5 lg:mt-20">
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold">
              {partner.fullname}
            </h1>
            <h2 className="text-gray-300 text-lg sm:text-xl -mt-2">
              {partner.position}
            </h2>

            {partner.about && (
              <p className="text-base md:text-lg leading-relaxed">
                {partner.about}
              </p>
            )}

            <ul className="space-y-3">
              <li className="flex items-center gap-x-2 border-b border-black-600 w-fit cursor-pointer">
                <a href={`tel:${partner.contact.phone}`} className="text-white">
                  Call {partner.contact.phone}
                </a>
                <RiArrowRightUpLine className="text-black-600" />
              </li>
              <li className="flex items-center gap-x-2 border-b border-black-600 w-fit cursor-pointer">
                <a
                  href={partner.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white flex items-center gap-x-2"
                >
                  LinkedIn
                  <RiArrowRightUpLine className="text-black-600" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* მეორე სექცია */}
      <div className="bg-white text-[#291616] px-4 lg:px-20 py-10 w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Bio */}
          <section>
            <h3 className="text-2xl font-semibold mb-4">Biography</h3>
            <p className="text-base leading-relaxed flex flex-col-reverse">
              {partner.biography}
            </p>
          </section>

          {/* Contact & Links */}
          <section className="space-y-10 ">
            {/* Office Contact */}
            <div className="hidden lg:flex justify-between items-center w-full">
              <h3 className="text-2xl font-semibold">Office Contact</h3>
              <a
                href={`mailto:${partner.contact.email}`}
                className="text-[#291616] underline"
              >
                {partner.contact.email}
              </a>
              <a
                href={`tel:${partner.contact.phone}`}
                className="text-[#291616]"
              >
                {partner.contact.phone}
              </a>
            </div>

            <div className="flex flex-col gap-2 lg:hidden">
              <h3 className="text-2xl font-semibold">Office Contact</h3>
              <a
                href={`mailto:${partner.contact.email}`}
                className="text-[#291616] underline"
              >
                {partner.contact.email}
              </a>
              <a
                href={`tel:${partner.contact.phone}`}
                className="text-[#291616]"
              >
                {partner.contact.phone}
              </a>
            </div>

            {/* Links */}
            <div className="hidden lg:flex justify-between items-center w-full border-t border-gray-300 pt-10">
              <h3 className="text-2xl font-semibold">Links</h3>

              <div className="flex-1 flex justify-center ">
                <div className="flex items-center gap-x-2 border-b border-black-600 w-fit cursor-pointer ">
                  <a
                    href={partner.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[16px] text-black-600 flex items-center gap-x-4 "
                  >
                    <span>LINKED IN</span>
                    <RiArrowRightUpLine className=" text-black-600 " />
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile & Tablet version */}
            <div className=" flex flex-col gap-2 lg:hidden ">
              <h3 className="text-2xl font-semibold">Links</h3>
              <div className="flex items-center gap-x-2 border-b border-black-600 w-fit cursor-pointer">
                <a
                  href={partner.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[16px] text-black-600 flex items-center gap-x-1"
                >
                  <span>LinkedIn</span>
                  <RiArrowRightUpLine className="text-black-600" />
                </a>
              </div>
            </div>
          </section>

          {/* services */}
          {partner.services.length > 0 && (
            <section className="space-y-2  border-b border-t pt-10 border-gray-300 pb-10  ">
              <h3 className="text-2xl font-semibold mb-2">Services</h3>
              <ul className="list-disc pl-5 space-y-1">
                {partner.services.map((service, i) => (
                  <li key={i}>{service}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
