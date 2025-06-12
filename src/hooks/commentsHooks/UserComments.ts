async function userComents(
  quote: string,
  rating: number,
  fullname: string,
  position: string,
) {
  const responce = await fetch('http://localhost:4000/api/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quote: quote,
      rating: rating,
      fullname: fullname,
      position: position,
    }),
    credentials: 'include',
  })
  if (!responce.ok) {
    throw new Error('qoutes api does not working')
  }

  const data = await responce.json()

  return data
}

export default userComents
