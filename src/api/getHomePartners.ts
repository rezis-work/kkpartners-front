import type { Partner } from './getOurPartners'

export const getHomePartners = async (): Promise<Array<Partner>> => {
  try {
    const response = await fetch('http://localhost:4000/api/partner?limit=6')
    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Failed to fetch limited partners:', error)
    return []
  }
}
