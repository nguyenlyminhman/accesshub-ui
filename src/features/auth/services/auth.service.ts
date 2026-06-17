import httpClient from '@/services/httpClient'
import type { LoginPayload, LoginResponse } from '../types/auth.type'

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
      // Giả sử httpClient trả về AxiosResponse, ta lấy thuộc tính data
      const { data } = await httpClient.post<LoginResponse>('/api/v1/auth/login', payload)     
      return data;
  },

  logout: async (): Promise<void> => {
    await httpClient.post('/auth/logout')
  },
}