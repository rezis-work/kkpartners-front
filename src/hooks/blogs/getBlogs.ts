// hooks/blogs/getBlogs.ts

async function getBlogs(page: number) {
  const res = await fetch(
    `http://localhost:4000/api/blogs?page=${page}&limit=4`,
  )
  if (!res.ok) throw new Error('Failed to fetch blogs')

  const data = await res.json()
  return data
}

export default getBlogs
