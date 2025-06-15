async function getMessages() {
  const response = await fetch('http://localhost:4000/api/contact', {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  return data
}
export default getMessages
