export const getDaysInMonth = (year: string, month: string) => {
  if (!year || !month) return []

  const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate()

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    return { value: day.toString(), label: day.toString() }
  })
}