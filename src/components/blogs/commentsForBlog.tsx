import { useQuery } from '@tanstack/react-query'

import blogsComments from '@/hooks/blogs/blogsComments'

interface CommentsForBlogProps {
  blogId: string
  _id: string
  name: string
  content: string
}

export default function CommentsForBlog({ blogId }: CommentsForBlogProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['commentsForBlog', blogId],
    queryFn: () => blogsComments(blogId),
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {data.map((coments: CommentsForBlogProps, _id: string) => {
        return (
          <div key={coments._id} className="mb-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">{coments.name}</h3>
            <p className="text-gray-700">{coments.content}</p>
          </div>
        )
      })}
    </div>
  )
}
