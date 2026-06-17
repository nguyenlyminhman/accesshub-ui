import type { BaseResponse } from "@/types/common.type"

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
  [key: string]: any 
}

export interface LoginData {
  accessToken: string
  userInfo: UserInfo
  menuList: MenuList[]
}

export type LoginResponse = BaseResponse<LoginData>;
export type LoginErrorResponse = BaseResponse<null>;
