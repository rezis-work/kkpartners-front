async function carouseldata() {
  const res = await fetch('http://localhost:4000/api/carousel', {
    credentials: 'include',
  })
  if (!res.ok) {
    throw new Error('failed fetching in carouseldata')
  }
  const data = await res.json()
  return data.data
}
export default carouseldata
