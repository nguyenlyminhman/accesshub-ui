import httpClient from '@/services/httpClient'
import type { User, CreateUserPayload } from '../types/user.type'

export const userService = {
  getList: async (): Promise<User[]> => {
    const { data } = await httpClient.get<User[]>('/users')
    return data
  },

  create: async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await httpClient.post<User>('/users', payload)
    return data
  },
}