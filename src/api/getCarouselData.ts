export async function getCarouselData() {
  const response = await fetch('http://localhost:4000/api/carousel')

  if (!response.ok) {
    throw new Error('Failed to fetch carousel data')
  }

  const data = await response.json()
  console.log(data.data)
  return data.data
}
