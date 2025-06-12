async function QuotesFetch() {
  console.log('Fetching quotes...')
  const responce = await fetch('http://localhost:4000/api/quotes', {
    credentials: 'include',
  })
  if (!responce.ok) {
    throw new Error('Swiper fetching problem')
  }
  const data = await responce.json()

  return data.data
}

export default QuotesFetch
