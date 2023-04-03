import { createStore } from '@/lib/zustand'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { setInputEl } from '@/helpers/setInputElement'
import type { NextRouter } from 'next/router'
type Variant = 'login' | 'register'
type Action = { type: Variant; router: NextRouter }

export const useAuth = createStore(
  {
    email: '',
    name: '',
    password: '',
    variant: 'login' as Variant,
    isRegistered: false,
    isError: false
  },
  (set, get) => ({
    setAuth: setInputEl(set),
    setVariant: () => set(state => void (state.variant = state.variant == 'login' ? 'register' : 'login'))
  }),
  async (state, action: Action) => {
    const { email, name, password } = state
    try {
      switch (action.type) {
        case 'register':
          await axios.post('/api/register', { email, name, password })
          state.isRegistered = true
          break
        case 'login':
          const signRes = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: '/auth'
          })
          console.log(signRes)

          if (signRes?.ok) {
            state.email = ''
            state.password = ''
            action.router.push('/')
          }
          break
      }
    } catch (error) {
      state.isRegistered = false
      state.isError = true
      console.log(error)
    }
  }
)
