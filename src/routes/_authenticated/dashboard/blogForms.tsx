import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { blogs } from '@/hooks/blogs/blogs'
import ConfirmModal from '@/components/modals/modal'
import UploadWidget from '@/components/uploadimage'

export const Route = createFileRoute('/_authenticated/dashboard/blogForms')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const mutation = useMutation<
    unknown,
    Error,
    {
      title: string
      subTitle: string
      slug: string
      author: string
      content: string
      images: Array<string>
      category: string
      tags: Array<string>
      share: {
        facebook: string
        linkedin: string
        x: string
        instagram: string
      }
      lawWays: string
    }
  >({
    mutationFn: (data) => blogs(data),
    onError: (error) => {
      throw new Error('mutation function is filed while fetching blogs', error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<Array<string>>([])
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<Array<string>>([])
  const [fb, setFb] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [lawWays, setLawWays] = useState('')
  const [showModal, setShowModal] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowModal(true)
  }
  const handleCancel = () => {
    setShowModal(false)
  }
  const handleConfirm = () => {
    mutation.mutate({
      title,
      subTitle,
      slug,
      author,
      content,
      images: Array.isArray(images) ? images : [images],
      category,
      tags,
      share: {
        facebook: fb,
        linkedin,
        x: twitter,
        instagram,
      },
      lawWays,
    })
    restValues()
    setShowModal(false)

    console.log({
      title,
      subTitle,
      slug,
      author,
      content,
      images,
      category,
      tags,
      share: {
        facebook: fb,
        linkedin,
        x: twitter,
        instagram,
      },
      lawWays,
    })
  }
  function restValues() {
    setTitle('')
    setSubTitle('')
    setSlug('')
    setAuthor('')
    setAuthor('')
    setContent('')
    setCategory('')
    setTags([])
    setFb('')
    setLinkedin('')
    setTwitter('')
    setInstagram('')
    setLawWays('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create Blog Post</h2>
      <Link to="/dashboard">
        <button className="flex ml-auto bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transitionn cursor-pointer">
          Back to Dashboard
        </button>
      </Link>
      <form
        className="max-w-3xl mx-auto mt-12 p-10 bg-white rounded-2xl shadow-lg space-y-6"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create New Blog
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="text"
          placeholder="Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {/* Multiselect with styling */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Advisory',
              'Analysis',
              'Business',
              'Civil Law',
              'Profit',
              'Statistics',
            ].map((tag) => (
              <label key={tag} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={tag}
                  checked={tags.includes(tag)}
                  onChange={(e) => {
                    const checked = e.target.checked
                    if (checked) {
                      setTags([...tags, tag])
                    } else {
                      setTags(tags.filter((t) => t !== tag))
                    }
                  }}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-gray-700">{tag}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Social Media */}
        <input
          type="url"
          placeholder="Facebook URL"
          value={fb}
          onChange={(e) => setFb(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="url"
          placeholder="Twitter (X) URL"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="url"
          placeholder="Instagram URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          placeholder="Legal considerations"
          value={lawWays}
          onChange={(e) => setLawWays(e.target.value)}
          rows={4}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Upload Widget */}
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
            setState={setImages}
            widgetButtonText={'Upload Image'}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition"
        >
          Add New Blog
        </button>
      </form>

      <ConfirmModal
        visible={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        qusestion="Do you want to add new blog?"
      />
    </div>
  )
}
