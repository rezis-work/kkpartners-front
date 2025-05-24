import { createFileRoute } from '@tanstack/react-router'
import { TeamPage } from '@/components/TeamPage'

export const Route = createFileRoute('/our-team')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      {' '}
      <TeamPage />
    </div>
  )
}
