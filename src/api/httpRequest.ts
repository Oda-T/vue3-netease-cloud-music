import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { returnDataType } from '../type/http-request.type'
import mdui from 'mdui'

class HttpRequest {
  private axiosIns: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
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
      (err: AxiosError) => {
        mdui.snackbar({
          message: err.message,
          position: 'right-bottom',
          buttonText: '返回'
        })
        return Promise.reject(err)
      }
    )
  }
  // get
  public get = async <T>(url: string, data: T, callback: Function): Promise<void> => {
    const response: returnDataType = await this.axiosIns.get(url, {
      params: data
    })
    this.codeType(response, callback)
  }
  // post
  public post = async <T>(url: string, data: T, callback: Function): Promise<void> => {
    const response: returnDataType = await this.axiosIns.post(url, data)
    this.codeType(response, callback)
  }
  // 200 or another
  private codeType = (response: returnDataType, callback: Function): void => {
    const code = response.code

    switch (code) {
      case 200:
        callback(response)
        break
      case 301:
        mdui.snackbar({
          message: `${code}需要登陆`,
          position: 'right-bottom'
        })
        break
      case 502:
        mdui.snackbar({
          message: `${code}错误`,
          position: 'right-bottom'
        })
        break
      default:
        mdui.snackbar({
          message: `${code}`,
          position: 'right-bottom'
        })
        console.error(response)
    }
  }
}
export default HttpRequest
