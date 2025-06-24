export async function deleteFaq(id: string) {
    const response = await fetch(`http://localhost:4000/api/faq/${id}`, {
      method: 'DELETE',
    })
  
    if (!response.ok) throw new Error('Failed to delete FAQ')
    return response.status === 204 ? null : await response.json()
  }
  