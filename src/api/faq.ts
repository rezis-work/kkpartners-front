// const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getFaqs() {
  const res =await fetch('http://localhost:4000/api/faq', {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to fetch FAQs')
  return res.json()
}

export async function addFaq(newFaq: { question: string; answer: string }) {
  const res = await fetch(`http://localhost:4000/api/faq`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newFaq),
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to add FAQ')
  return res.json()
}

export async function deleteFaq(id: string) {
  const token = localStorage.getItem('token')
  const res = await fetch(`http://localhost:4000/api/faq/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to delete FAQ')
  return res.status === 204 ? null : res.json()
}

export async function updateFaq(id: string, updatedFaq: { question: string; answer: string }) {
  const token = localStorage.getItem('token')
  const res = await fetch(`http://localhost:4000/api/faq/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFaq),
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to update FAQ')
  return res.json()
}
