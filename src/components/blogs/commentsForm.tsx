import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogForm from '@/hooks/blogs/comentsForm'

interface CommentFormProps {
  blogId: string
}

export default function CommentsForm({ blogId }: CommentFormProps) {
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')

  const mutation = useMutation({
    mutationFn: () => blogForm({ name, email, content, parentId: '' }, blogId),
    onSuccess: () => {
      localStorage.setItem('commentUserName', name)

      setName('')
      setEmail('')
      setContent('')
      queryClient.invalidateQueries({ queryKey: ['commentsForBlog', blogId] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <div className="w-full px-10 pb-10 pt-30">
      <form onSubmit={handleSubmit} className="space-y-4 lg:max-w-5xl m-auto">
        <h1 className="text-5xl">Leave a Reply</h1>
        <p className="text-2xl">
          Your email address will not be published. Required fields are marked *
        </p>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content"
          className="border p-2 w-full h-[100px] md:h-[200px]"
        />
        <div className="w-full flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="border-0 border-b font-bold border-gray-400 focus:border-blue-500 focus:outline-none p-2 md:w-1/2 w-full"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter mail"
            className="border-0 border-b font-bold border-gray-400 focus:border-blue-500 focus:outline-none p-2 md:w-1/2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 cursor-pointer"
        >
          Publish
        </button>
      </form>
    </div>
  )
}
