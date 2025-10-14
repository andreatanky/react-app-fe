import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'

const getLocationKey = (href?: string) => href ?? ''

export const ScrollRestorationProvider = ({ children }: PropsWithChildren) => {
  const location = useRouterState({
    select: (state) => state.location,
  })

  const positionsRef = useRef<Map<string, number>>(new Map())
  const currentKeyRef = useRef<string>(getLocationKey(location.href))
  const rafRef = useRef<number | null>(null)

  const locationKey = useMemo(() => getLocationKey(location.href), [location.href])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleScroll = () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = window.requestAnimationFrame(() => {
        positionsRef.current.set(currentKeyRef.current, window.scrollY)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const previousKey = currentKeyRef.current
    positionsRef.current.set(previousKey, window.scrollY)

    currentKeyRef.current = locationKey

    const storedPosition = positionsRef.current.get(locationKey) ?? 0

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: storedPosition,
        behavior: 'auto',
      })
    })
  }, [locationKey])

  return <>{children}</>
}

