import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blogsId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/blogsId/"!</div>
}
