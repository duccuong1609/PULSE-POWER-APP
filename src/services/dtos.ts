export interface ERROR_CONTAINER_PROPS {
    statusCode: number;
    timestamp: Date;
    path: string;
    message: ERROR_PROPS;
}

export interface ERROR_PROPS {
    status: number;
    message: string;
    details: string;
}

export interface LOGIN_DTO {
    email: string;
    password: string;
}

export interface LOGIN_PROPS {
    user: BASE_USER_PROPS;
    access_token: string;
    refresh_token: string;
}

export interface BASE_USER_PROPS {
    id: number;
    email: string;
    username: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface REFRESH_PROPS {
    access_token: string;
    duration: number;
}

export interface PRODUCT_PROPS {
    id: number,
    referanceId: string,
    name: string,
    description?: string,
    imgUrl?: string,
    price?: string,
}

export interface CUSTOMER_PROPS {
    id: number,
    referanceId: string,
    name: string,
    imgUrl?: string,
    description?: string,
    price?: string,
}

export interface RECOMMEND_DTO {
    user_id: string,
    top_k: number,
}

export interface RECOMMEND_PRODUCT_DTO {
    product_id: string,
    top_k: number,
}

export interface RECOMMEND_ITEM_PROPS {
    product_id: string,
    score: number,
    rank: number
}

export interface RECOMMEND_PROPS {
    user_id: string,
    recommendations: RECOMMEND_ITEM_PROPS[],
}

export interface RECOMMEND_PRODUCT_PROPS {
    product_id: string,
    recommendations: RECOMMEND_ITEM_PROPS[],
}