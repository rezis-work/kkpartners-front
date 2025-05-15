async function FetchBanners() {
  const res = await fetch('http://localhost:4000/api/banners')

  if (!res.ok) {
    throw new Error('fetching problem')
  }

  const data = await res.json()
  return data.data
}

export default FetchBanners
