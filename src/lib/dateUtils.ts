export const getDaysInMonth = (year: string, month: string) => {
  if (!year || !month) return []

  const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate()

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    return { value: day.toString(), label: day.toString() }
  })
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export const formatLocalizedDate = (dateString: string, locale: string) => {
  const date = new Date(dateString)

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
