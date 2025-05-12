export async function getClients() {
  const response = await fetch('http://localhost:4000/api/business')

  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }

  const data = await response.json()
  return data.data
}
