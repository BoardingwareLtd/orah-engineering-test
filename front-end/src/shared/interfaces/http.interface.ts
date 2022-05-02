export type ApiResponse<DataType> = (DataType & SuccessResponse) | FailureResponse

export interface SuccessResponse {
  success: true
  error?: undefined
}
export interface FailureResponse {
  success: false
  error: ResponseError
}
export interface ResponseError {
  type?: string
  message?: string
}

export enum HTTPMethod {
  get = "GET",
  post = "POST",
  put = "PUT",
}
