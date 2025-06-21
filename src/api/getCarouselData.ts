export async function getCarouselData() {
  const response = await fetch('http://localhost:4000/api/carousel', {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch carousel data')
  }

  const data = await response.json()

  return data.data
}
