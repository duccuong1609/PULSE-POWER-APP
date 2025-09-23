import { queryOptions } from '@tanstack/react-query'
import authService from '@/services/authService'
import type { REFRESH_PROPS } from '@/services/dtos'
import { CONST } from '@/config/const'

const refreshTokenQuery = (extraKey: string[] = [], options?: Omit<Parameters<typeof queryOptions<REFRESH_PROPS>>[0], 'queryKey' | 'queryFn'> ) =>
  queryOptions<REFRESH_PROPS>({
    queryKey: ['refresh-token', ...extraKey],
    queryFn: () => authService.refreshToken(),
    staleTime: CONST.REFRESH_DURATION_MS,
    refetchInterval: CONST.REFRESH_DURATION_MS,
    enabled: !!localStorage.getItem(CONST.AXIOS.REFRESH_TOKEN),
    ...options,
  })

const authQueries = {
  refreshTokenQuery,
}

export default authQueries