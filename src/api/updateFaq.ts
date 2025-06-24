export async function updateFaq(id: string, updatedFaq: { question: string; answer: string }) {
    const response = await fetch(`http://localhost:4000/api/faq/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFaq),
    })
  
    if (!response.ok) throw new Error('Failed to update FAQ')
  
    return await response.json()
  }
  