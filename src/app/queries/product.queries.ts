import { queryOptions } from '@tanstack/react-query'
import type { PRODUCT_PROPS } from '@/services/dtos'
import productService from '@/services/productService'

const getProductListQuery = (extraKey: string[] = [], options?: Omit<Parameters<typeof queryOptions<PRODUCT_PROPS[]>>[0], 'queryKey' | 'queryFn'> ) =>
  
  queryOptions<PRODUCT_PROPS[]>({
    queryKey: ['list-product', ...extraKey],
    queryFn: () => productService.getListProduct(),
    staleTime: 0,
    ...options,
  })

const productQueries = {
  getProductListQuery,
}

export default productQueries