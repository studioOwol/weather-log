import { useEffect, useRef, useCallback } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  onIntersect: () => void
  enabled?: boolean
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '100px',
  onIntersect,
  enabled = true,
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && enabled) {
        onIntersect()
      }
    },
    [onIntersect, enabled]
  )

  useEffect(() => {
    const element = targetRef.current
    if (!element || !enabled) return

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [handleIntersect, threshold, rootMargin, enabled])

  return { ref: targetRef }
}