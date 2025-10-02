import { request } from "@/api/request"
import type { PRODUCT_PROPS } from "./dtos"

const PRODUCT_API = {
    GETALL: '/product',
}

const getListProduct = async () : Promise<PRODUCT_PROPS[]> => {
    return await request<void, PRODUCT_PROPS[]>({
        url: PRODUCT_API.GETALL,
        method: 'GET',
        type: 'protected'
    });
}

const productService = {
    getListProduct,
}

export default productService