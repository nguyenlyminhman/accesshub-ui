import { useQuery } from '@tanstack/react-query';
import { departmentApi } from '../api/department.api';
import { departmentKeys } from '../api/department.keys';

export const useDepartments = (filters: any = {}) => {
  return useQuery({
    queryKey: departmentKeys.list(filters),
    queryFn: () => departmentApi.getList(),
    select: (data: any) => data, // chỗ này quan trọng, nói ở dưới
  });
};