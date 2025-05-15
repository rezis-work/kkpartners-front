import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import ErrorBoundary from '@/components/ErrorBoundaries'
import NotFound from '@/components/NotFound'

interface MyRouterContext {
  queryClient: QueryClient
}

const query = new QueryClient()

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <QueryClientProvider client={query}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        <TanStackRouterDevtools />
        <TanstackQueryLayout />
      </QueryClientProvider>
    </>
  ),
  notFoundComponent: NotFound,
})
