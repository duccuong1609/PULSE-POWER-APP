import { queryOptions } from '@tanstack/react-query'
import type { PRODUCT_PROPS, RECOMMEND_PRODUCT_DTO, RECOMMEND_PRODUCT_PROPS } from '@/services/dtos'
import productService from '@/services/productService'

const getProductListQuery = (extraKey: string[] = [], options?: Omit<Parameters<typeof queryOptions<PRODUCT_PROPS[]>>[0], 'queryKey' | 'queryFn'> ) =>
  
  queryOptions<PRODUCT_PROPS[]>({
    queryKey: ['list-product', ...extraKey],
    queryFn: () => productService.getListProduct(),
    staleTime: 5000,
    ...options,
  })

const getRecommendTopKProductQuery = (payload: RECOMMEND_PRODUCT_DTO,extraKey: string[] = [], options?: Omit<Parameters<typeof queryOptions<RECOMMEND_PRODUCT_PROPS>>[0], 'queryKey' | 'queryFn'> ) =>
  
  queryOptions<RECOMMEND_PRODUCT_PROPS>({
    queryKey: ['product-input','top-k-recommend-product', ...extraKey],
    queryFn: () => productService.getRecommendTopKProduct(payload),
    staleTime: 0,
    ...options,
  })

const productQueries = {
  getProductListQuery,
  getRecommendTopKProductQuery
}

export default productQueries