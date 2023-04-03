import useSwr from 'swr'
import type { User } from '@prisma/client'
import fetcher from '@/libs/fetcher'

const useCurrentUser = () => useSwr<User>('/api/current', fetcher)

export default useCurrentUser
