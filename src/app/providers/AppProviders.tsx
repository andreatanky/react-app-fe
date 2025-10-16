import {
	QueryClient,
	QueryClientProvider,
	useQueryClient,
} from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { type ReactNode, useMemo, useState } from "react";
import type { StoreApi } from "zustand";
import { createAppRouter } from "../router/router";
import {
	type AuthStore,
	createAuthStore,
	useAuthStoreApi,
} from "../store/authStore";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";

type AppProvidersProps = {
	children?: ReactNode;
};

const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

const RouterWithContext = () => {
	const authStore = useAuthStoreApi();
	const queryClient = useQueryClient();

	const router = useMemo(
		() =>
			createAppRouter({
				auth: authStore,
				queryClient,
			}),
		[authStore, queryClient],
	);

	return <RouterProvider router={router} />;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
	const [authStore] = useState<StoreApi<AuthStore>>(() => createAuthStore());
	const [queryClient] = useState<QueryClient>(() => createQueryClient());

	return (
		<ThemeProvider>
			<AuthProvider store={authStore}>
				<QueryClientProvider client={queryClient}>
					<RouterWithContext />
					{children}
				</QueryClientProvider>
			</AuthProvider>
		</ThemeProvider>
	);
};
