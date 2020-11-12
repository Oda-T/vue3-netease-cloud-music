import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { returnDataType } from '../type/http-request.type'
import mdui from 'mdui'

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
    this.axiosIns.interceptors.response.use(({ data }: AxiosResponse) => {
      try {
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    })
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
  // 200 or others
  private codeType = (response: returnDataType, callback: Function): void => {
    const code = response.code

    switch (code) {
      case 200:
        callback(response)
        break
      case 301:
        mdui.snackbar({
          message: `错误代码：${code}需要登陆`,
          position: 'right-bottom'
        })
        break
      case 401:
        mdui.snackbar({
          message: `错误代码：${code}无权限`,
          position: 'right-bottom'
        })
        break
      case 502:
        mdui.snackbar({
          message: `错误代码：${code}需要登陆`,
          position: 'right-bottom'
        })
        break
      case 505:
        mdui.snackbar({
          message: `错误代码：${code}http版本错误`,
          position: 'right-bottom'
        })
        break
      default:
        mdui.snackbar({
          message: `错误代码：${code}`,
          position: 'right-bottom'
        })
        console.log(response)
    }
  }
}
export default HttpRequest
