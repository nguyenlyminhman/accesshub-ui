export interface User {
  id: number
  fullName: string
  email: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface CreateUserPayload {
  fullName: string
  email: string
  password: string
}