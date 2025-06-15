export interface Client {
  id: string
  name: string
  // Add other client properties as needed
}

export async function getClients() {
  const response = await fetch('http://localhost:4000/api/business')

  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }

  const data = await response.json()
  return data.data
}

export async function createClient(clientData: Omit<Client, 'id'>) {
  const response = await fetch('http://localhost:4000/api/business', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  })

  if (!response.ok) {
    throw new Error('Failed to create client')
  }

  const data = await response.json()
  return data.data
}

export async function updateClient(id: string, clientData: Partial<Client>) {
  const response = await fetch(`http://localhost:4000/api/business/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  })

  if (!response.ok) {
    throw new Error('Failed to update client')
  }

  const data = await response.json()
  return data.data
}

export async function deleteClient(id: string) {
  const response = await fetch(`http://localhost:4000/api/business/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete client')
  }

  return true
}
