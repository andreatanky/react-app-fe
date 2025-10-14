import { MutableRefObject, useMemo } from 'react'

import { useIsIntersecting } from './useIsIntersecting'

export const useStickyVisibility = (
  targetRef: MutableRefObject<Element | null>,
  options?: IntersectionObserverInit,
) => {
  const isIntersecting = useIsIntersecting(targetRef, options)
  return useMemo(() => !isIntersecting, [isIntersecting])
}
