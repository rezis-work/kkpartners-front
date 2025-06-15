import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import updateCarousel from '@/hooks/carouselServices/carousel'
import ConfirmModal from '@/components/modals/modal'
import UploadWidget from '@/components/uploadimage'

export const Route = createFileRoute('/_authenticated/carousel')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const mutation = useMutation<
    unknown,
    Error,
    {
      title: string
      subtitle: string
      image: string
      link1: string
      link2: string
    }
  >({
    mutationFn: (data) =>
      updateCarousel(
        data.title,
        data.subtitle,
        data.image,
        data.link1,
        data.link2,
      ),
    onError: (error) => {
      throw new Error('mutation function is fialed in carousle filer', error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carousel'] })
    },
  })

  const [title, setTitle] = useState('')
  const [subtitle, setSubTitle] = useState('')
  const [image, setImage] = useState<string | null>('')
  const [link1, setLink1] = useState('')
  const [link2, setLink2] = useState('')
  const [showModal, setShowModal] = useState(false)

  function submitedForm(e: React.FormEvent) {
    e.preventDefault()
    setShowModal(true)
  }
  const handleCancel = () => {
    setShowModal(false)
  }
  const handleConfirm = () => {
    mutation.mutate({ title, subtitle, image: image || '', link1, link2 })
    console.log({ title, subtitle, image, link1, link2 })

    setImage('')
    setLink1('')
    setLink2('')
    setTitle('')
    setSubTitle('')

    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <form className="space-y-6" onSubmit={submitedForm}>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Enter title"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       shadow-sm transition"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Subtitle
            </label>
            <input
              value={subtitle}
              onChange={(e) => setSubTitle(e.target.value)}
              type="text"
              id="subtitle"
              placeholder="Enter subtitle"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      shadow-sm transition"
              required
            />
          </div>
          <div className="pt-4">
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
              setState={setImage}
              widgetButtonText={'Upload Image'}
            />
          </div>

          {/* Link 1 */}
          <div>
            <label
              htmlFor="link1"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Link 1
            </label>
            <input
              value={link1}
              onChange={(e) => setLink1(e.target.value)}
              type="url"
              id="link1"
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      shadow-sm transition"
            />
          </div>

          {/* Link 2 */}
          <div>
            <label
              htmlFor="link2"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Link 2
            </label>
            <input
              value={link2}
              onChange={(e) => setLink2(e.target.value)}
              type="url"
              id="link2"
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                      shadow-sm transition"
            />
          </div>

          {/* Upload Widget */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md
                 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300
                  transition"
          >
            Submit
          </button>
        </form>
      </div>

      <ConfirmModal
        visible={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        qusestion="Do you want to change carousel?"
      />
    </div>
  )
}
