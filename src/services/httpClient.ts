import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import type { BaseResponse } from '@/types/common.type'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10_000,
})

// Gắn Bearer token vào mọi request
httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Xử lý mọi Response từ BE
httpClient.interceptors.response.use(
  // Xử lý data
  (response) => {
    const body = response.data as BaseResponse<unknown>;
    // BE trả code 200 nhưng success lại false
    if (!body.success) {
      return Promise.reject(new Error(body.message || 'Có lỗi xảy ra, vui lòng thử lại sau'));
    }

    response.data = body.data;
    return response;
  },

  // Xử lý lỗi
  (error: AxiosError) => {

    // Token hết hạn → clear store → redirect login
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/'
    }

    let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại sau';
    // Kiểm tra nếu lỗi trả về từ phía Backend (có response và data)
    if (error.response && error.response.data) {
      const errorData = error.response.data as BaseResponse<null>;
      
      // Lấy trực tiếp trường "message" theo format chung mà BE trả về
      errorMessage = errorData.message || errorMessage;
    } else if (error.message) {
      // Lỗi mạng hoặc server sập nguồn không trả về data
      errorMessage = error.message;
    }

    // Ném lỗi đã được định dạng đẹp đẽ này ra ngoài
    return Promise.reject(new Error(errorMessage));
  }
)

export default httpClient;
