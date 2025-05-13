export interface Address {
  _id: string
  city: string
  street: string
  phone: string
  email: string
}

export const fetchAddresses = async (): Promise<Address[]> => {
  try {
    const response = await fetch('http://localhost:4000/api/address')
    const data = await response.json()
    return data.address || []
  } catch (error) {
    console.error('Failed to fetch addresses:', error)
    return []
  }
}
