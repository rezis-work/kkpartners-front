export interface Partner {
    _id?: string 
    fullname: string
    position: string
    about: string
    biography: string
    image: string
    cover: string
    contact: Contact
    services: string[]
  }
  
  export interface Contact {
    linkedin: string
    phone: string
    email: string
  }
  
  ////get partners
  export const getPartners = async (): Promise<Partner[]> => {
    try {
      const response = await fetch('http://localhost:4000/api/partner')
      const result = await response.json()
      return result.data || []
    } catch (error) {
      console.error('Failed to fetch partners:', error)
      return []
    }
  }
  
 //add partners
//   export const postPartner = async (partner: Partner): Promise<Partner> => {
//     const response = await fetch('http://localhost:4000/api/partner', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(partner),
//     })
  
//     if (!response.ok) {
//       throw new Error('Failed to post partner')
//     }
  
//     const result = await response.json()
//     return result.data
//   }
  