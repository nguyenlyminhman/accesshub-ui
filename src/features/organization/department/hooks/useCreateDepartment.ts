import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { departmentApi } from '../api/department.api';
import { departmentKeys } from '../api/department.keys';

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: departmentApi.create,
    onSuccess: (newDept) => {
      // Cách 1: invalidate -> refetch lại (đơn giản, an toàn)
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });

      // Cách 2 (tối ưu hơn): set cache trực tiếp, khỏi gọi lại API
      // queryClient.setQueryData(departmentKeys.lists(), (old: Department[] = []) => [...old, newDept]);

      message.success('Tạo department thành công');
    },
    onError: (err) => {
      message.error('Tạo department thất bại');
    },
  });
};