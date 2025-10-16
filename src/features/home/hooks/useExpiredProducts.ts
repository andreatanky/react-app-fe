import { useQuery } from "@tanstack/react-query";

import { fetchExpiredProducts } from "../../../mocks/api/productsApi";

export const EXPIRED_PRODUCTS_QUERY_KEY = ["expired-products"];

export const useExpiredProducts = () => {
	const { data = [], isLoading } = useQuery({
		queryKey: EXPIRED_PRODUCTS_QUERY_KEY,
		queryFn: fetchExpiredProducts,
	});

	return {
		products: data,
		isLoading,
	};
};
