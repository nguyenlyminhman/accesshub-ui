
export interface BaseResponse<T> {
  success: boolean
  code: number
  message: string
  data: T // Kiểu dữ liệu của data sẽ phụ thuộc vào T bạn truyền vào
}
