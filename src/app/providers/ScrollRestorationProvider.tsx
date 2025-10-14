import { useEffect, useMemo, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'

const getLocationKey = (href?: string) => href ?? ''
const shouldRestore = (pathname?: string) => pathname === '/'

export const ScrollRestorationEffect = () => {
  const location = useRouterState({
    select: (state) => state.location,
  })

  const positionsRef = useRef<Map<string, number>>(new Map())
  const currentKeyRef = useRef<string>(
    shouldRestore(location.pathname) ? getLocationKey(location.href) : '',
  )
  const previousPathnameRef = useRef<string>(location.pathname)
  const previousHrefRef = useRef<string>(location.href)
  const rafRef = useRef<number | null>(null)

  const locationKey = useMemo(() => getLocationKey(location.href), [location.href])
  const trackScroll = shouldRestore(location.pathname)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (!trackScroll) {
      currentKeyRef.current = ''
      return
    }

    const handleScroll = () => {
      if (!currentKeyRef.current) {
        return
      }

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
  }, [trackScroll])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const previousPathname = previousPathnameRef.current
    const previousHref = previousHrefRef.current

    if (shouldRestore(previousPathname)) {
      const previousKey = getLocationKey(previousHref)
      positionsRef.current.set(previousKey, window.scrollY)
    }

    previousPathnameRef.current = location.pathname
    previousHrefRef.current = location.href

    if (!trackScroll) {
      currentKeyRef.current = ''
      return
    }

    currentKeyRef.current = locationKey

    const storedPosition = positionsRef.current.get(locationKey) ?? 0

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: storedPosition,
        behavior: 'auto',
      })
    })
  }, [locationKey, trackScroll, location.pathname, location.href])

  return null
}

