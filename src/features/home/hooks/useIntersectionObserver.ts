import { MutableRefObject, useEffect } from 'react'

type IntersectionOptions = IntersectionObserverInit | undefined

export const useIntersectionObserver = (
  targetRef: MutableRefObject<Element | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionOptions,
) => {
  useEffect(() => {
    const element = targetRef.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [callback, options, targetRef])
}
