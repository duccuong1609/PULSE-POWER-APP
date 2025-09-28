import { request } from "@/api/request"
import type { BASE_USER_PROPS, LOGIN_DTO, LOGIN_PROPS, REFRESH_PROPS } from "./dtos"
import { CONST } from "@/config/const";

const AUTH_API = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    CURRENT_USER: '/users/me'
}

const login = async (payload : LOGIN_DTO) : Promise<LOGIN_PROPS> => {
    return request<LOGIN_DTO, LOGIN_PROPS>({
        url: AUTH_API.LOGIN,
        method: 'POST',
        body: payload
    });
}


const getUserInfo = async () : Promise<BASE_USER_PROPS> => {
    return request<void, BASE_USER_PROPS>({
        url: AUTH_API.CURRENT_USER,
        method: 'GET',
        type: 'protected'
    });
}

const refreshToken = async() : Promise<REFRESH_PROPS> => {
    return request<object, REFRESH_PROPS>({
        url: AUTH_API.REFRESH,
        method: 'POST',
        type: 'protected',
        params: {refreshToken : localStorage.getItem(CONST.AXIOS.REFRESH_TOKEN) || ''}
    });
}

const logout = async (id : number): Promise<void> => {
    return request<object, void>({
        url: AUTH_API.LOGOUT,
        method: 'POST',
        type: 'protected',
        params: {userId : id}
    });
}

const authService = {
    login,
    getUserInfo,
    refreshToken,
    logout
}

export default authService