import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import type { QueryClient } from '@tanstack/react-query'
import ErrorBoundary from '@/components/ErrorBoundaries'
import NotFound from '@/components/NotFound'
import FooterComponent from '@/components/Footer'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ErrorBoundary>
        <Outlet />
        <FooterComponent />
      </ErrorBoundary>
      <Outlet />

      <TanStackRouterDevtools />

      <TanstackQueryLayout />
    </>
  ),
  notFoundComponent: NotFound,
})

export const rootRoute = Route
