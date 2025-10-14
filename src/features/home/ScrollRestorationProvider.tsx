import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'

const scrollPositions = new Map<string, number>()

const getLocationKey = (href?: string) => href ?? ''
const isHome = (pathname?: string) => pathname === '/'

export const useHomeScrollRestoration = () => {
  const location = useRouterState({
    select: (state) => state.location,
  })

  const { pathname, href } = location
  const activeKey = getLocationKey(href)
  const shouldTrack = isHome(pathname)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (!shouldTrack) {
      return
    }

    const storedPosition = scrollPositions.get(activeKey)
    if (typeof storedPosition === 'number') {
      window.scrollTo({
        top: storedPosition,
        behavior: 'auto',
      })
    }
    const persistedPosition = storedPosition

    const position = typeof persistedPosition === 'number' ? persistedPosition : 0

    window.scrollTo({
      top: position,
      behavior: 'auto',
    })
  }, [shouldTrack, activeKey])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (!shouldTrack) {
      return
    }

    let rafHandle = 0

    const handleScroll = () => {
      if (rafHandle) {
        cancelAnimationFrame(rafHandle)
      }
      rafHandle = requestAnimationFrame(() => {
        scrollPositions.set(activeKey, window.scrollY)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      scrollPositions.set(activeKey, window.scrollY)
      window.removeEventListener('scroll', handleScroll)
      if (rafHandle) {
        cancelAnimationFrame(rafHandle)
      }
    }
  }, [shouldTrack, activeKey])
}
