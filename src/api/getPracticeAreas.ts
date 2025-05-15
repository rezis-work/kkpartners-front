export async function getPracticeAreas() {
  const response = await fetch('http://localhost:4000/api/practice')

  if (!response.ok) {
    throw new Error('Failed to fetch practice areas')
  }

  const data = await response.json()
  return data.practice
}
