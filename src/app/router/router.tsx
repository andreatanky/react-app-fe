import {
  Outlet,
  createRootRouteWithContext,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import type { StoreApi } from 'zustand'

import { type AuthStore } from '../store/authStore'
import { AppRootLayout } from './AppRootLayout'
import { HomePage } from '../../features/home/HomePage'
import { HelpPage } from '../../features/help/HelpPage'
import { ReadingEnvironmentPage } from '../../features/reading/ReadingEnvironmentPage'

export type AppRouterContext = {
  queryClient: QueryClient
  auth: StoreApi<AuthStore>
}

const rootRoute = createRootRouteWithContext<AppRouterContext>()({
  component: () => (
    <AppRootLayout>
      <Outlet />
    </AppRootLayout>
  ),
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const readingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reading',
  component: ReadingEnvironmentPage,
})

const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/help',
  component: HelpPage,
})

const routeTree = rootRoute.addChildren([homeRoute, readingRoute, helpRoute])

export const createAppRouter = (context: AppRouterContext) =>
  createRouter({
    routeTree,
    context,
    defaultPreload: 'intent',
  })

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}

