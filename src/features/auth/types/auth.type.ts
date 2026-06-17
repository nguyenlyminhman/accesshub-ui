export interface LoginPayload {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  fullName: string
  email: string
  roles: string[]
}

export interface BackendMenu {
  id: number
  title: string
  path: string
  icon: string | null
  children: BackendMenu[]
}

export interface LoginResponse {
  accessToken: string
  user: UserInfo
  menus: BackendMenu[]
}