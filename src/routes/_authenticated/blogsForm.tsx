import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import blogs from '@/hooks/blogs/blogs'
import ConfirmModal from '@/components/modals/modal'
import UploadWidget from '@/components/uploadimage'

export const Route = createFileRoute('/_authenticated/blogsForm')({
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create Blog Post</h2>
      <form className="space-y-6" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <select
          multiple
          value={tags}
          onChange={(e) =>
            setTags(
              Array.from(e.target.selectedOptions, (option) => option.value),
            )
          }
          className="w-full p-3 border rounded-lg"
        >
          <option value="Advisory">Advisory</option>
          <option value="Analysis">Analysis</option>
          <option value="Business">Business</option>
          <option value="Civil Law">Civil Law</option>
          <option value="Profit">Profit</option>
          <option value="Statistics">Statistics</option>
        </select>

        <input
          type="url"
          placeholder="Facebook URL"
          value={fb}
          onChange={(e) => setFb(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="url"
          placeholder="Twitter (X) URL"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="url"
          placeholder="Instagram URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          placeholder="Legal considerations"
          value={lawWays}
          onChange={(e) => setLawWays(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded-lg"
        />

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
          widgetButtonText="Upload Image"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Add new blog
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
