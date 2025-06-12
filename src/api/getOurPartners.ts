export interface Partner {
  _id: string
  fullname: string
  position: string
  about: string
  biography: string
  image: string
  cover: string
  contact: Contact
  services: Array<string>
  linkedin: string
  phone: string
  email: string
}

export interface Contact {
  linkedin: string
  phone: string
  email: string
}

export const getPartners = async (): Promise<Array<Partner>> => {
  try {
    const response = await fetch(`http://localhost:4000/api/partner`)
    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Failed to fetch partners:', error)
    return []
  }
}

export const getPartnerById = async (id: string): Promise<Partner | null> => {
  const res = await fetch(`http://localhost:4000/api/partner/${id}`)
  const result = await res.json()
  return result.data || null
}
