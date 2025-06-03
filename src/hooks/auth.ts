export async function useAuth(email: string, password: string) {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('auth: problem check auth')
  }

  const data = await response.json()
  return data
}
