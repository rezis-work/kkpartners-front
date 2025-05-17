export async function getFaqs() {
  const response = await fetch('http://localhost:4000/api/faq')

  if (!response.ok) {
    throw new Error('Failed to fetch FAQ')
  }

  const data = await response.json()
  return data.faqs
}
