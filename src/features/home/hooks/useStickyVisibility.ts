import { type MutableRefObject, useMemo } from "react";

import { useIsIntersecting } from "./useIsIntersecting";

export const useStickyVisibility = (
	targetRef: MutableRefObject<Element | null>,
	enabled = true,
	options?: IntersectionObserverInit,
) => {
	const isIntersecting = useIsIntersecting(targetRef, options, enabled);
	return useMemo(
		() => (enabled ? !isIntersecting : false),
		[enabled, isIntersecting],
	);
};
