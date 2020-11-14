import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { returnDataType } from '../type/http-request.type'

class HttpRequest {
  private axiosIns: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true
  })

  constructor() {
    // 请求体带token
    this.axiosIns.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    })
    this.axiosIns.interceptors.response.use(
      ({ data }: AxiosResponse) => {
        return Promise.resolve(data)
      },
      (error: AxiosError) => {
        return Promise.resolve(error)
      }
    )
  }
  // get
  public get = async <T>(url: string, data: T, callback: Function): Promise<void> => {
    const response: returnDataType = await this.axiosIns.get(url, {
      params: data
    })
    callback(response)
  }
  // post
  public post = async <T>(url: string, data: T, callback: Function): Promise<void> => {
    const response: returnDataType = await this.axiosIns.post(url, data)

    callback(response)
  }
}
export default HttpRequest
