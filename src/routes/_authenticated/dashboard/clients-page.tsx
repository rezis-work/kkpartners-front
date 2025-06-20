import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getClients } from '@/api/getClients'

export const Route = createFileRoute('/_authenticated/dashboard/clients-page')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data || !Array.isArray(data)) return <div>No data available</div>
  {
    return <div>Hello "/_authenticated/dashboard/clients-page"!</div>
  }
}
