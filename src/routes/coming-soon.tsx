
import { createFileRoute } from '@tanstack/react-router'
import ComingSoon from '../components/ComingSoon'

export const Route = createFileRoute('/coming-soon')({
  component: ComingSoon,
})

