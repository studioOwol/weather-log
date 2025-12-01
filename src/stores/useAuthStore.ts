import { create } from "zustand"
import type { User } from "@supabase/supabase-js"

interface AuthState {
  user: User | null
  loading: boolean
  setAuth: (user: User | null, loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setAuth: (user, loading) => set({ user, loading }),
}))

// Selector: Get current user ID
export const getUserId = () => {
  const user = useAuthStore.getState().user
  if (!user) throw new Error("User not authenticated")
  return user.id
}
