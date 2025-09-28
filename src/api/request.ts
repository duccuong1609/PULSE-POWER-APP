import { protectedInstance, publicInstance } from "./axiosInstance";

type RequestProps<T> = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    type?: "public" | "protected";
    body?: T;
    params?: T;
}

export async function request<T, V>({
  url,
  method = "GET",
  body,
  type = "public",
  params,
}: RequestProps<T>): Promise<V> {
    const instance = type === "public" ? publicInstance : protectedInstance;
    const headers: Record<string, string> = {};
    if (body instanceof FormData) {
        // Axios tự set content-type với boundary, không override
    } else {
        headers["Content-Type"] = "application/json";
    }
    const response = await instance({
        url,
        method,
        data: body,
        params,
        headers
    });
  return response.data as V;
}