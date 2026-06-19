import type { BaseResponse } from "@/types/common.type";

export interface Department {
  id: number;
  deptCode: string;
  deptName: string;
  details: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
}

export interface CreateDepartmentPayload {
  name: string;
  code: string;
}

export type DepartmentResponse = BaseResponse<Department>;