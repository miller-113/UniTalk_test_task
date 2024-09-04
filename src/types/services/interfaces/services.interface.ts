import { AxiosResponse } from 'axios'

export interface ErrorResponse {
  code: string
  message: string
  status: number
}

export type ServiceFunction<Response, Params = undefined> = (
  params?: Params
) => Promise<AxiosResponse<Response>>
