import { createStore } from '@/lib/zustand'

const initState = {
  email: '',
  name: '',
  password: '',
  variant: 'login' as 'login' | 'register'
}

type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T]

export const useAuth = createStore(initState, (set, get) => ({
  setAuth: (key: StringKeys<typeof initState>) => (e: React.ChangeEvent<HTMLInputElement>) => set({ [key]: e.target.value }),
  setVariant: () => set(state => void (state.variant = state.variant == 'login' ? 'register' : 'login'))
}))
