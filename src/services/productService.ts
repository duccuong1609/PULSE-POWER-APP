import { request } from "@/api/request"
import type { PRODUCT_PROPS, RECOMMEND_PRODUCT_DTO, RECOMMEND_PRODUCT_PROPS } from "./dtos"

const PRODUCT_API = {
    GETALL: '/product',
    RECOMMEND_NEU_MF: '/product/recommend_neuMF'
}

const getListProduct = async () : Promise<PRODUCT_PROPS[]> => {
    return await request<void, PRODUCT_PROPS[]>({
        url: PRODUCT_API.GETALL,
        method: 'GET',
        type: 'protected'
    });
}

const getRecommendTopKProduct = async (payload: RECOMMEND_PRODUCT_DTO) : Promise<RECOMMEND_PRODUCT_PROPS> => {
    return await request<RECOMMEND_PRODUCT_DTO, RECOMMEND_PRODUCT_PROPS>({
        url: PRODUCT_API.RECOMMEND_NEU_MF,
        method: 'POST',
        body: payload,
        type: 'protected'
    });
}

const productService = {
    getListProduct,
    getRecommendTopKProduct
}

export default productService