import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/user.service'
import type { CreateUserPayload } from '../types/user.type'
import { message } from 'antd'

const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
}

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: userService.getList,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateUserPayload) => userService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() })
      message.success('Tạo user thành công!')
    },
    onError: () => {
      message.error('Tạo user thất bại!')
    },
  })
}