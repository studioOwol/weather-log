import { useState, useRef, useEffect } from "react"

export const useMemoToggle = (memo: string | null) => {
  const [isMemoExpanded, setIsMemoExpanded] = useState(false)
  const [shouldToggleMemo, setShouldToggleMemo] = useState(false)
  const memoRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      if (memoRef.current && memo) {
        if (!isMemoExpanded) {
          const isOverflowing = memoRef.current.scrollHeight > memoRef.current.clientHeight
          setShouldToggleMemo(isOverflowing)
        }
      } else {
        setShouldToggleMemo(false)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow()
    })

    if (memoRef.current) {
      resizeObserver.observe(memoRef.current)
    }

    // 초기 체크
    checkOverflow()

    return () => {
      resizeObserver.disconnect()
    }
  }, [memo, isMemoExpanded])

  return {
    memoRef,
    isMemoExpanded,
    setIsMemoExpanded,
    shouldToggleMemo,
  }
}
