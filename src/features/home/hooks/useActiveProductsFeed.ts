import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { fetchActiveProducts } from "../../../mocks/api/productsApi";

export const ACTIVE_PRODUCTS_QUERY_KEY = ["active-products"];

export const useActiveProductsFeed = () => {
	const query = useInfiniteQuery({
		queryKey: ACTIVE_PRODUCTS_QUERY_KEY,
		initialPageParam: 0,
		queryFn: ({ pageParam = 0 }) => fetchActiveProducts({ pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});

	const items = useMemo(
		() => query.data?.pages.flatMap((page) => page.items) ?? [],
		[query.data],
	);

	return {
		items,
		fetchNextPage: query.fetchNextPage,
		hasNextPage: query.hasNextPage ?? false,
		isFetchingNextPage: query.isFetchingNextPage,
		isLoading: query.isInitialLoading,
	};
};
