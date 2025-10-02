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
    description: string,
    imgUrl: string,
    price: string,
}

export interface CUSTOMER_PROPS {
    id: number,
    referanceId: string,
    name: string,
    description: string,
    imgUrl: string,
    price: string,
}