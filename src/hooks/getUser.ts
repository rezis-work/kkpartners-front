export default async function getCurrentUser() {
  const res = await fetch('http://localhost:4000/api/auth/me', {
    credentials: 'include',
  })

  if (!res.ok) {
    console.log('fetching problem in getusers')
    throw new Error('Failed to fetch user data') // შეცდომის გადაცემის დამატება
  }

  const data = await res.json()
  console.log(data)

  return data
}

export type User = Awaited<ReturnType<typeof getCurrentUser>>
