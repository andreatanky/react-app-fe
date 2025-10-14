import { MutableRefObject, useCallback, useEffect, useState } from 'react'

import { useIntersectionObserver } from './useIntersectionObserver'

export const useIsIntersecting = (
  targetRef: MutableRefObject<Element | null>,
  options?: IntersectionObserverInit,
  enabled = true,
) => {
  const [isIntersecting, setIsIntersecting] = useState(true)

  useEffect(() => {
    if (!enabled) {
      setIsIntersecting(true)
    }
  }, [enabled])

  const handleIntersection = useCallback<IntersectionObserverCallback>(
    ([entry]) => {
      if (entry && enabled) {
        setIsIntersecting(entry.isIntersecting)
      }
    },
    [enabled],
  )

  useIntersectionObserver(targetRef, handleIntersection, options, enabled)

  return isIntersecting
}
