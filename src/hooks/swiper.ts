async function QuotesFetch() {
  const responce = await fetch('http://localhost:4000/api/quotes')
  if (!responce.ok) {
    throw new Error('Swiper fetching problem')
  }
  const data = await responce.json()

  return data.data
}

export default QuotesFetch
