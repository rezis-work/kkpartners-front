/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FaEnvelope, FaLinkedin, FaPhoneAlt } from 'react-icons/fa'
import type { EachTeamMemeber } from '@/types'
import ConfirmModal from '@/components/modals/modal'

interface SingleMemberProps {
  members: EachTeamMemeber
}

export default function SingleMember({ members }: SingleMemberProps) {
  const navigate = useNavigate()
  const [showmodale, setShowModal] = useState(false)
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <button
        onClick={() => setShowModal(true)}
        className="flex ml-auto bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition my-10 cursor-pointer"
      >
        Back to Dashboard
      </button>
      {/* Header Cover */}
      <div
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center rounded-xl shadow-md mb-10"
        style={{ backgroundImage: `url(${members.cover})` }}
      ></div>

      {/* Info Block */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left: Profile image & contacts */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {members.image ? (
            <img
              src={members.image}
              alt={members.fullname}
              className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg mb-4"
            />
          ) : (
            <img
              src="https://www.vecteezy.com/free-vector/default-user"
              alt={members.fullname}
              className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg mb-4"
            />
          )}
          <h2 className="text-3xl font-bold text-gray-800">
            {members.fullname}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{members.position}</p>

          {/* Contact info */}
          <div className="space-y-2 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> {members.contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope /> {members.contact.email}
            </p>
            <a
              href={members.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>

        {/* Right: Bio & Services */}
        <div>
          {members.about && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                About
              </h3>
              <p className="text-gray-700 leading-relaxed">{members.about}</p>
            </div>
          )}

          {members.biography && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Biography
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {members.biography}
              </p>
            </div>
          )}
          {members.services && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Services
              </h3>
              <ul className="text-gray-700 leading-relaxed list-disc pl-5">
                {members.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        visible={showmodale}
        onConfirm={() => {
          setShowModal(false)
          navigate({ to: '/' })
        }}
        onCancel={() => setShowModal(false)}
        qusestion="Are you sure you want to leave?"
      />
    </div>
  )
}
