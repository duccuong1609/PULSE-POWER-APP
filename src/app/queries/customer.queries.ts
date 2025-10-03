import { queryOptions } from '@tanstack/react-query'
import type { CUSTOMER_PROPS, RECOMMEND_DTO, RECOMMEND_PROPS } from '@/services/dtos'
import customerService from '@/services/customerService'

const getRecommendTopKProductQuery = (payload: RECOMMEND_DTO,extraKey: string[] = [], options?: Omit<Parameters<typeof queryOptions<RECOMMEND_PROPS>>[0], 'queryKey' | 'queryFn'> ) =>
  
  queryOptions<RECOMMEND_PROPS>({
    queryKey: ['top-k-recommend-product', ...extraKey],
    queryFn: () => customerService.getRecommendTopKProduct(payload),
    staleTime: 0,
    ...options,
  })

const getAllCustomerQuery = (extraKey: string[] = [], options?: Omit<Parameters<typeof queryOptions<CUSTOMER_PROPS[]>>[0], 'queryKey' | 'queryFn'> ) =>
  queryOptions<CUSTOMER_PROPS[]>({
    queryKey: ['list-customer', ...extraKey],
    queryFn: () => customerService.getListCustomer(),
    staleTime: 0,
    ...options,
})

const customerQueries = {
  getRecommendTopKProductQuery,
  getAllCustomerQuery
}

export default customerQueries