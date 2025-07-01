async function blogsComments(blogId: string) {
  const response = await fetch(`http://localhost:4000/api/comment/${blogId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch comments for the blog')
  }
  const data = await response.json()
  console.log(data)
  return data.result
}

export default blogsComments
