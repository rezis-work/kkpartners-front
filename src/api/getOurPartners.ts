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

export interface PaginatedResponse {
  data: Partner[]
  total: number
  page: number
  limit: number
}

export const getPartners = async (
  currentPage: number,
  itemsPerPage: number,
): Promise<PaginatedResponse> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/partner?page=${currentPage}&limit=${itemsPerPage}`,
    )
    const result = await response.json()
    return {
      data: result.data || [],
      total: result.total || 0,
      page: currentPage,
      limit: itemsPerPage,
    }
  } catch (error) {
    console.error('Failed to fetch partners:', error)
    return {
      data: [],
      total: 0,
      page: currentPage,
      limit: itemsPerPage,
    }
  }
}

export const getPartnerById = async (id: string): Promise<Partner | null> => {
  const res = await fetch(`http://localhost:4000/api/partner/${id}`)
  const result = await res.json()
  return result.data || null
}
