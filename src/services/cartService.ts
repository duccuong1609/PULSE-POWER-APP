import { request } from "@/api/request"
import type { RECOMMEND_PRODUCT_V2_PROPS } from "./dtos"

export interface CART_RECOMMEND_DTO {
    cart_items: string[];
    top_k: number;
}

const CART_API = {
    RECOMMEND: '/cart/recommend' 
}

export const MODEL_NAME = ["als", "svd", "slim", "hybrid", "knn", "ease"] as const;
export type ModelType = typeof MODEL_NAME[number];

const getRecommendFromCart = async (modelName: ModelType = 'hybrid', payload: CART_RECOMMEND_DTO) : Promise<RECOMMEND_PRODUCT_V2_PROPS> => {
    return await request<CART_RECOMMEND_DTO, RECOMMEND_PRODUCT_V2_PROPS>({
        url: `${CART_API.RECOMMEND}?model_name=${modelName}`,
        method: 'POST',
        body: payload,
        type: 'protected'
    });
}

const cartService = {
    getRecommendFromCart
}

export default cartService