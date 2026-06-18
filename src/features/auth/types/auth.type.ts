import type { BaseResponse } from "@/types/common.type"
import type { ReactNode } from "react"

export interface LoginPayload {
  username: string
  password: string
  projectCode: string
}
export interface UserInfo {
  username: string
  email: string
  deptCode: string
  deptName: string
  details: string
  roles: string[]
}
export interface MenuList {
  id?: number;
  title: string;
  uiCode: string;
  url: string;
  parentId: number | string | null;
  sortOrder: number;
  permissions: string | null;
  icon?: ReactNode | null;
  children?: MenuList[];
}

export interface LoginData {
  accessToken: string
  userInfo: UserInfo
  menuList: MenuList[]
}

export type LoginResponse = BaseResponse<LoginData>;
export type LoginErrorResponse = BaseResponse<null>;
