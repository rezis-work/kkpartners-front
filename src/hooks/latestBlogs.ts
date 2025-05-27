export default async function LatestBlogs() {
  const res = await fetch(`http://localhost:4000/api/blogs/latest?limit=5`)
  const data = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch latest blogs')
  }
  return data.data
}
