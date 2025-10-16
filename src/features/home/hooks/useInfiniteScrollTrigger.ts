import { MutableRefObject, useMemo } from "react";

import { useIsIntersecting } from "./useIsIntersecting";

export const useInfiniteScrollTrigger = (
	sentinelRef: MutableRefObject<Element | null>,
	enabled: boolean,
	options?: IntersectionObserverInit,
) => {
	const isIntersecting = useIsIntersecting(sentinelRef, options, enabled);
	return useMemo(() => enabled && isIntersecting, [enabled, isIntersecting]);
};
