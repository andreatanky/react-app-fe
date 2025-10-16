import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	createRoute,
	createRouter,
	Outlet,
} from "@tanstack/react-router";
import type { StoreApi } from "zustand";
import { HelpPage } from "../../features/help/HelpPage";
import { HomePage } from "../../features/home/HomePage";
import { ReadingEnvironmentPage } from "../../features/reading/ReadingEnvironmentPage";
import type { AuthStore } from "../store/authStore";
import { AppRootLayout } from "./AppRootLayout";

export type AppRouterContext = {
	queryClient: QueryClient;
	auth: StoreApi<AuthStore>;
};

const rootRoute = createRootRouteWithContext<AppRouterContext>()({
	component: () => (
		<AppRootLayout>
			<Outlet />
		</AppRootLayout>
	),
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: HomePage,
});

const readingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/reading",
	component: ReadingEnvironmentPage,
});

const helpRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/help",
	component: HelpPage,
});

const routeTree = rootRoute.addChildren([homeRoute, readingRoute, helpRoute]);

export const createAppRouter = (context: AppRouterContext) =>
	createRouter({
		routeTree,
		context,
		defaultPreload: "intent",
	});

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createAppRouter>;
	}
}
