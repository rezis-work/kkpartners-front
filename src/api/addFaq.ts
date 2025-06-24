export async function addFaq(newFaq: { question: string; answer: string }) {
    const response = await fetch('http://localhost:4000/api/faq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFaq),
    })
  
    if (!response.ok) throw new Error('Failed to add FAQ')
  
    return await response.json()
  }
  