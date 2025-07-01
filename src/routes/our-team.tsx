import { createFileRoute } from '@tanstack/react-router'
import { TeamPage } from '@/components/TeamPage'
import FooterComponent from '@/components/Footer'

export const Route = createFileRoute('/our-team')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      {' '}
      <TeamPage />
      <FooterComponent />
    </div>
  )
}
