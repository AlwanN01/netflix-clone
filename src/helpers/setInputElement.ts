import { SetState } from '@/lib/zustand'

type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T]

export const setInputEl =
  <IState>(set: SetState<IState>) =>
  (key: StringKeys<IState>) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    // @ts-ignore
    set({ [key]: e.target.value })
