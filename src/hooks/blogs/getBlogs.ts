// hooks/blogs/getBlogs.ts

interface GetBlogsParams {
  page?: number
  limit?: number
  category?: string
  tags?: string
  search?: string
}

const getBlogs = async (params: GetBlogsParams = {}) => {
  const { page = 1, limit = 10, category, tags, search } = params

  // Build query string
  const queryParams = new URLSearchParams()
  queryParams.append('page', page.toString())
  queryParams.append('limit', limit.toString())

  if (category) queryParams.append('category', category)
  if (tags) queryParams.append('tags', tags)
  if (search) queryParams.append('search', search)

  const url = `http://localhost:4000/api/blogs?${queryParams.toString()}`
  console.log('Fetching blogs from:', url) // Debug log

  const res = await fetch(url)

  if (!res.ok) {
    console.error('Blogs API error:', res.status, res.statusText)
    const errorText = await res.text()
    console.error('Error response:', errorText)
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data
}

const getAllTags = async () => {
  const response = await fetch('http://localhost:4000/api/blogs/tags')

  if (!response.ok) {
    throw new Error('Failed to fetch tags')
  }

  return response.json()
}

export { getBlogs, getAllTags }
export default getBlogs
