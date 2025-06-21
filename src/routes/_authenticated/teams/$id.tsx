import { createFileRoute } from '@tanstack/react-router'
import type { EachTeamMemeber } from '@/types'
import { EachTeamMemebers } from '@/hooks/homeTeam'
import SingleMember from '@/components/homepagecomponents/SingleMember'

export const Route = createFileRoute('/_authenticated/teams/$id')({
  component: TeamMembes,
  loader: async ({ params }) => {
    const response = await EachTeamMemebers(params.id)
    return { members: response.data } // აქ data ამოგვაქვს
  },
})

function TeamMembes() {
  const { members }: { members: EachTeamMemeber } = Route.useLoaderData()
  console.log(members)
  return <SingleMember members={members} />
}
