interface BlogForm {
  name: string
  email: string
  content: string
  parentId: string
}
async function blogForm(form: BlogForm, blogId: string) {
  const response = await fetch(`http://localhost:4000/api/comment/${blogId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
    credentials: 'include',
  })

  if (!response.ok) throw new Error('Failed to fetch comments for the blog')
  return response.json()
}

export default blogForm
