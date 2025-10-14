import { MutableRefObject, useEffect } from 'react'

type IntersectionOptions = IntersectionObserverInit | undefined

export const useIntersectionObserver = (
  targetRef: MutableRefObject<Element | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionOptions,
  enabled = true,
) => {
  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const element = targetRef.current
    if (!element) {
      return undefined
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [callback, enabled, options, targetRef])
}
