import { request } from "@/api/request"
import type { CUSTOMER_PROPS, RECOMMEND_DTO, RECOMMEND_PROPS } from "./dtos"

const CUSTOMER_API = {
    GETALL: '/customer',
    RECOMMEND: '/customer/recommend'
}

const getRecommendTopKProduct = async (payload: RECOMMEND_DTO) : Promise<RECOMMEND_PROPS> => {
    return await request<RECOMMEND_DTO, RECOMMEND_PROPS>({
        url: CUSTOMER_API.RECOMMEND,
        method: 'POST',
        body: payload,
        type: 'protected'
    });
}

const getListCustomer = async () : Promise<CUSTOMER_PROPS[]> => {
    return await request<void, CUSTOMER_PROPS[]>({
        url: CUSTOMER_API.GETALL,
        method: 'GET',
        type: 'protected'
    });
}

const customerService = {
    getRecommendTopKProduct,
    getListCustomer
}

export default customerService