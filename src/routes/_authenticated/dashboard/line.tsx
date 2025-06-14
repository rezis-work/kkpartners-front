import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/line')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/dashboard/line"!</div>
}
