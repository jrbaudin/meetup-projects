export interface IGetPushLogsResponse {
  success: boolean
  data?: {
    reports: object
  }
  error?: {
    code: string
    message: string
  }
}
