import { MutableRefObject, useCallback } from 'react'

import { useIntersectionObserver } from './useIntersectionObserver'

export const useInfiniteScroll = (
  sentinelRef: MutableRefObject<Element | null>,
  onIntersect: () => void,
  options?: IntersectionObserverInit,
  disabled = false,
) => {
  const handleIntersection = useCallback<IntersectionObserverCallback>(
    ([entry]) => {
      if (entry?.isIntersecting && !disabled) {
        onIntersect()
      }
    },
    [disabled, onIntersect],
  )

  useIntersectionObserver(sentinelRef, handleIntersection, options)
}
