import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import UploadWidget from '@/components/UploadWidget'

export const Route = createFileRoute('/_authenticated/dashboard/createPartner')(
  {
    component: CreatePartner,
  },
)

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-semibold">Dashboard</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate({ to: '/dashboard/team-members' })}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Team Members
            </button>
            <button
              onClick={() => navigate({ to: '/dashboard/createPartner' })}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Create Partner
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function CreatePartner() {
  const [images, setImages] = useState<string | null>(null)
  const [cover, setCover] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    fullname: '',
    position: '',
    about: '',
    biography: '',
    image: '',
    cover: '',
    contact: {
      linkedin: '',
      phone: '',
      email: '',
    },
    services: [''],
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    if (name.startsWith('contact.')) {
      const key = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [key]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleServiceChange = (index: number, value: string) => {
    const updatedServices = [...formData.services]
    updatedServices[index] = value
    setFormData((prev) => ({ ...prev, services: updatedServices }))
  }

  const addService = () => {
    setFormData((prev) => ({ ...prev, services: [...prev.services, ''] }))
  }

  const removeService = (index: number) => {
    const updatedServices = formData.services.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, services: updatedServices }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('http://localhost:4000/api/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}`)
      }

      setSuccess(true)
      setFormData({
        fullname: '',
        position: '',
        about: '',
        biography: '',
        image: '',
        cover: '',
        contact: {
          linkedin: '',
          phone: '',
          email: '',
        },
        services: [''],
      })
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Add New Partner
            </h1>
            <p className="text-gray-600 text-lg">
              Create a comprehensive partner profile
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Basic Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                  <Input
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g., Senior Partner, Managing Director"
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Short Description"
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      placeholder="Brief description of expertise"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Media & Images
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <UploadWidget
                      uwConfig={{
                        cloudName: 'dpnmghmd5',
                        uploadPreset: 'kkpartners',
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: 'uploads',
                        sources: ['local', 'url', 'camera'],
                        croppingShowBackButton: true,
                        showAdvancedOptions: false,
                        cropping: true,
                        theme: 'light',
                      }}
                      setState={setImages}
                      widgetButtonText={'Upload Profile Image'}
                    />
                    <div className="relative aspect-square w-full max-w-[200px] mx-auto">
                      {images ? (
                        <div className="relative group">
                          <img
                            src={images}
                            alt="Profile Preview"
                            className="w-full h-full object-cover rounded-xl shadow-md"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => setImages(null)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              title="Remove image"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                          <div className="text-center text-gray-500">
                            <svg
                              className="w-8 h-8 mx-auto mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <p className="text-xs">No profile image</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Input
                      label="Profile Image URL"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-4">
                    <UploadWidget
                      uwConfig={{
                        cloudName: 'dpnmghmd5',
                        uploadPreset: 'kkpartners',
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: 'uploads',
                        sources: ['local', 'url', 'camera'],
                        croppingShowBackButton: true,
                        showAdvancedOptions: false,
                        cropping: true,
                        theme: 'light',
                      }}
                      setState={setCover}
                      widgetButtonText={'Upload Cover Image'}
                    />
                    <div className="relative aspect-[16/9] w-full max-w-[300px] mx-auto">
                      {cover ? (
                        <div className="relative group">
                          <img
                            src={cover}
                            alt="Cover Preview"
                            className="w-full h-full object-cover rounded-xl shadow-md"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => setCover(null)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              title="Remove image"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                          <div className="text-center text-gray-500">
                            <svg
                              className="w-8 h-8 mx-auto mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-xs">No cover image</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Input
                      label="Cover Image URL"
                      name="cover"
                      value={formData.cover}
                      onChange={handleChange}
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="LinkedIn Profile"
                    name="contact.linkedin"
                    value={formData.contact.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                  <Input
                    label="Phone Number"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                  <Input
                    label="Email Address"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleChange}
                    placeholder="partner@company.com"
                  />
                </div>
              </div>

              {/* Biography Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Biography
                  </h2>
                </div>

                <TextArea
                  label="Detailed Biography"
                  name="biography"
                  value={formData.biography}
                  onChange={handleChange}
                  placeholder="Provide a comprehensive biography including background, experience, achievements..."
                />
              </div>

              {/* Services Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Services & Expertise
                  </h2>
                </div>

                <div className="space-y-4">
                  {formData.services.map((service, index) => (
                    <div key={index} className="flex gap-3 items-center group">
                      <div className="flex-1">
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder={`Service ${index + 1} (e.g., Strategic Consulting, Legal Advisory)`}
                          value={service}
                          onChange={(e) =>
                            handleServiceChange(index, e.target.value)
                          }
                        />
                      </div>
                      {formData.services.length > 1 && (
                        <button
                          onClick={() => removeService(index)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                          title="Remove service"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addService}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Service
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    'Create Partner Profile'
                  )}
                </button>
              </div>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-green-800 font-medium">
                    Partner successfully added!
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-red-800 font-medium">Error: {error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
      />
    </div>
  )
}

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-vertical"
      />
    </div>
  )
}
