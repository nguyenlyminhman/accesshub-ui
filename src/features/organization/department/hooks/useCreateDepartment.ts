import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { departmentApi } from '../api/department.api';
import { departmentKeys } from '../api/department.keys';

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: departmentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
      notification.success({description: 'Tạo department thành công'});
    },
    onError: (err: any) => {
      notification.success({description: err.message});
    },
  });
};