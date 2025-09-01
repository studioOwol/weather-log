import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark" | "system"

interface ThemeStore {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
}

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return "light"
}

const applyTheme = (theme: "light" | "dark") => {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      resolvedTheme: getSystemTheme(),
      setTheme: (theme: Theme) => {
        const resolvedTheme = theme === "system" ? getSystemTheme() : theme
        applyTheme(resolvedTheme)
        set({ theme, resolvedTheme })
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolvedTheme = state.theme === "system" ? getSystemTheme() : state.theme
          applyTheme(resolvedTheme)
          state.resolvedTheme = resolvedTheme
        }
      },
    }
  )
)

// 초기화 시 테마 적용
if (typeof window !== "undefined") {
  const initialState = useThemeStore.getState()
  applyTheme(initialState.resolvedTheme)
}

if (typeof window !== "undefined") {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const { theme } = useThemeStore.getState()
    if (theme === "system") {
      const resolvedTheme = e.matches ? "dark" : "light"
      applyTheme(resolvedTheme)
      useThemeStore.setState({ resolvedTheme })
    }
  })
}
