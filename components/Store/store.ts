import { create } from 'zustand'

interface PageState {
    page: string;
    setPage: (page: string) => void;
}
interface UserState {
    user: string;
    setUser: (user: string) => void;
}

export const useNavStore = create<PageState>((set) => ({
  page: '',
  setPage: (page: string) => set(() => ({ page })),
  // pageMain: () => set((state) => ({ page: 'main' })),
}))
export const useUserStore = create<UserState>((set) => ({
    user: '',
    setUser: (user: string) => set(() => ({ user })),
    // pageMain: () => set((state) => ({ page: 'main' })),
  }))