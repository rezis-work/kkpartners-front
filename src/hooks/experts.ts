async function Experts() {
  const res = await fetch('http://localhost:4000/api/partner?limit=5')
  if (!res.ok) {
    console.error('parners data is not working')
  }
  const data = await res.json()

  return data.data
}

export default Experts
