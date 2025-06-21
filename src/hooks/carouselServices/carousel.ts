async function updateCarousel(
  title: string,
  subtitle: string,
  image: string,
  link1: string,
  link2: string,
) {
  const response = await fetch('http://localhost:4000/api/carousel', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      subtitle: subtitle,
      image: image,
      link1: link1,
      link2: link2,
    }),
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('failed updateCarousel component ')
  }

  const data = await response.json()

  return data
}
export default updateCarousel
