interface BlogProps {
  title: string
  subTitle: string
  slug: string
  content: string
  images: Array<string>
  category: string
  tags: Array<string>
  author: string
  share: {
    facebook: string
    linkedin: string
    x: string
    instagram: string
  }
  lawWays: string
}

async function blogs(upload: BlogProps) {
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

  return data
}

export default blogs
