import { useState, useRef, useEffect } from "react"

export const useMemoToggle = (memo: string | null) => {
  const [isMemoExpanded, setIsMemoExpanded] = useState(false)
  const [shouldToggleMemo, setShouldToggleMemo] = useState(false)
  const memoRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      if (memoRef.current && memo) {
        // 축소 상태에서만 overflow 체크
        if (!isMemoExpanded) {
          const scrollHeight = memoRef.current.scrollHeight
          const clientHeight = memoRef.current.clientHeight
          // 5px 이상 차이날 때만 overflow로 판단 (브라우저 렌더링 오차 무시)
          const isOverflowing = scrollHeight - clientHeight > 5

          setShouldToggleMemo(isOverflowing)
        }
        // 확장 상태에서는 shouldToggleMemo 값을 유지 (버튼이 사라지지 않도록)
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
