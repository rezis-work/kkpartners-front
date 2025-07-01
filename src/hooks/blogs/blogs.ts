import type { BlogProps } from '@/types'

export async function blogs(upload: BlogProps) {
  const responce = await fetch('http://localhost:4000/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(upload),

    credentials: 'include',
  })
  if (!responce.ok) {
    throw new Error('filed to fetching blogs API')
  }
  const data = await responce.json()

  if (typeof data.images === 'string') {
    try {
      data.images = JSON.parse(data.images)
    } catch (e) {
      console.error('failed to parse images string', data.images)
      data.images = []
    }
  }

  return data
}

export async function blogsSlag(slag: string): Promise<{ data: BlogProps }> {
  const res = await fetch(`http://localhost:4000/api/blogs/${slag}`)
  if (!res.ok) {
    throw new Error('failed fetching blogs with slug')
  }
  return await res.json()
}

export async function updateBlog(id: string, update: Partial<BlogProps>) {
  const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Failed to update blog')
  }
  return await response.json()
}

export async function deleteBlog(id: string) {
  const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Failed to delete blog')
  }
  return await response.json()
}
