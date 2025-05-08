import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import type { QueryClient } from '@tanstack/react-query'
import ErrorBoundary from '@/components/ErrorBoundaries'
import NotFound from '@/components/NotFound'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <TanStackRouterDevtools />

      <TanstackQueryLayout />
    </>
  ),
  notFoundComponent: NotFound,
})
