import { queryOptions } from '@tanstack/react-query'
import authService from '@/services/authService'
import type { BASE_USER_PROPS } from '@/services/dtos'

const currentUserQuery = (extraKey: string[] = [], options?: Omit<Parameters<typeof queryOptions<BASE_USER_PROPS>>[0], 'queryKey' | 'queryFn'> ) =>
  queryOptions<BASE_USER_PROPS>({
    queryKey: ['current-user', ...extraKey],
    queryFn: () => authService.getUserInfo(),
    staleTime: 0,
    ...options,
  })

const userQueries = {
  currentUserQuery,
}

export default userQueries