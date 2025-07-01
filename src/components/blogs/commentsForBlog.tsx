import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import blogsComments from '@/hooks/blogs/blogsComments'
import deleteComms from '@/hooks/blogs/deleteComms'
import CommentsForm from './commentsForm'

interface Comment {
  _id: string
  name: string
  content: string
}

interface CommentsForBlogProps {
  blogId: string
}

export default function CommentsForBlog({ blogId }: CommentsForBlogProps) {
  const queryClient = useQueryClient()
  // ეს არის თვითონ გეთითსვიოს რომ წამოვიღოთ დეითა
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['commentsForBlog', blogId],
    queryFn: () => blogsComments(blogId),
  })
  // ეს არის დელეითისთვის
  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteComms(commentId),
    onSuccess: () => {
      toast.success('Comment deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['commentsForBlog', blogId] })
    },
    onError: () => toast.error('Failed to delete comment'),
  })

  typeof window !== 'undefined' ? localStorage.getItem('commentUserName') : null

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading comments...</div>
  }

  if (isError) {
    return toast.error('Something went wrong, try again.')
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto pt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Comments (0)</h2>
        <div className="text-center text-gray-500 py-10">No comments yet.</div>
        <CommentsForm blogId={blogId} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pt-16">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Comments {comments && comments.length > 0 ? `(${comments.length})` : ''}
      </h2>

      {!comments || comments.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No comments yet.</div>
      ) : (
        <div className="space-y-6 mb-10">
          {comments.map((comment: Comment) => (
            <div
              key={comment._id}
              className="flex items-start gap-4 bg-white rounded-xl shadow p-5 border border-gray-100"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">
                    {comment.name}
                  </span>
                  <div className="flex-1 flex justify-end items-end">
                    <button
                      onClick={() => deleteMutation.mutate(comment._id)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-50 text-red-600 text-xs font-medium shadow-sm hover:bg-red-100 transition-all duration-150 border border-red-200"
                      title="Delete comment"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* კომენტარის ფორმა ყოველთვის გამოჩნდეს */}
      <CommentsForm blogId={blogId} />
    </div>
  )
}
