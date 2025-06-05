import { createFileRoute } from '@tanstack/react-router'
import { PartnerBioPage } from '../../components/PartnerBioPage'

export const Route = createFileRoute('/team-bio/$id')({
  component: PartnerBioPage,
  
})

