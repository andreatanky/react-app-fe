import { MutableRefObject, useCallback, useState } from 'react'

import { useIntersectionObserver } from './useIntersectionObserver'

export const useIsIntersecting = (
  targetRef: MutableRefObject<Element | null>,
  options?: IntersectionObserverInit,
) => {
  const [isIntersecting, setIsIntersecting] = useState(true)
  const handleIntersection = useCallback<IntersectionObserverCallback>(
    ([entry]) => {
      if (entry) {
        setIsIntersecting(entry.isIntersecting)
      }
    },
    [],
  )

  useIntersectionObserver(
    targetRef,
    handleIntersection,
    options,
  )

  return isIntersecting
}
