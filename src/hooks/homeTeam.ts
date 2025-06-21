import type { EachTeamMemeber } from '@/types'

export async function getTeam(): Promise<Array<EachTeamMemeber>> {
  const responce = await fetch('http://localhost:4000/api/partner')
  if (!responce.ok) {
    console.error('problem in fetching Hoem team')
    return []
  }
  const data = await responce.json()

  return data.data
}
export async function EachTeamMemebers(
  id: string,
): Promise<{ data: EachTeamMemeber }> {
  const responce = await fetch(`http://localhost:4000/api/partner/${id}`)
  if (!responce.ok) {
    throw new Error('Failed to fetch team member')
  }
  return await responce.json()
}
