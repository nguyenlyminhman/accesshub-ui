import httpClient from '@/services/httpClient'
import type { LoginPayload, LoginResponse } from '../types/auth.type'

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await httpClient.post<LoginResponse>('/auth/login', payload)
    return data
  },

  logout: async (): Promise<void> => {
    await httpClient.post('/auth/logout')
  },
}