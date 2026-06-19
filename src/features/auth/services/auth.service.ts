import httpClient from '@/services/httpClient'
import type { LoginData, LoginPayload } from '../types/auth.type'

export const authService = {
  login: (payload: LoginPayload): Promise<LoginData> =>
    httpClient.post<LoginData>('/api/v1/auth/login', payload).then((res) => res.data),
  
  logout: async (): Promise<void> => {
    await httpClient.post('/auth/logout')
  },
}