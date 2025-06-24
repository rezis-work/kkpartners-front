async function blogsComments(blogId: string) {
  const response = await fetch(
    `http://localhost:4000/api/comments?blogId=${blogId}`,
    {
      credentials: 'include',
    },
  )
  if (!response.ok) {
    throw new Error('Failed to fetch comments for the blog')
  }

  const data = await response.json()
  return data
}

export default blogsComments
