async function contact(name: string, email: string, message: string) {
  const res = await fetch('http://localhost:4000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
    }),
    credentials: 'include',
  })
  if (!res.ok) {
    throw new Error('fetching problem in contact hook')
  }

  const data = res.json()

  return data
}

export default contact
