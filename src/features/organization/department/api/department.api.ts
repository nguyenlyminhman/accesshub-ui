import httpClient from '@/services/httpClient'
import type { CreateDepartmentPayload, DepartmentResponse } from '../types/department.types';


export const departmentApi = {
  getList: (): Promise<DepartmentResponse[]> =>
    httpClient.get('/api/v1/organization/department').then((res) => res.data),

  create: (payload: CreateDepartmentPayload): Promise<DepartmentResponse> =>
    httpClient.post('/api/v1/organization/department', payload).then((res) => res.data),
};
