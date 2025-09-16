import { useState, useEffect } from "react"
import { RULES } from "@/constants/rules"

export const useScreenSize = () => {
  const getCharLimit = () => {
    if (typeof window === "undefined") return RULES.MEMO_TOGGLE_LENGTH.MOBILE
    const width = window.innerWidth
    if (width >= 1600) return RULES.MEMO_TOGGLE_LENGTH.DESK
    if (width >= 1024) return RULES.MEMO_TOGGLE_LENGTH.LAPTOP
    return RULES.MEMO_TOGGLE_LENGTH.MOBILE
  }

  const [charLimit, setCharLimit] = useState(() => getCharLimit())

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)

      // 100ms 후에 실행 (throttling)
      timeoutId = setTimeout(() => {
        const newLimit = getCharLimit()
        if (newLimit !== charLimit) {
          setCharLimit(newLimit)
        }
      }, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeoutId)
    }
  }, [charLimit])

  return charLimit
}
