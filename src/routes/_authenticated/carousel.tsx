import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/carousel')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/carousel"!</div>
}
