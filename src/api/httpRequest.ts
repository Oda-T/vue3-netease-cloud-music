import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { returnDataType } from '../type/http-request.type'

class HttpRequest {
  private axiosIns: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
  })

  constructor() {
    // 请求体带token
    this.axiosIns.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    })
    this.axiosIns.interceptors.response.use(({ data }: AxiosResponse) => {
      try {
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    })
  }
  // get
  public get = async <T>(url: string, data: T, callback: Function) => {
    const response: returnDataType = await this.axiosIns.get(url, {
      params: data
    })
    this.codeType(response, callback)
  }
  // post
  public post = async <T>(url: string, data: T, callback: Function) => {
    const response: returnDataType = await this.axiosIns.post(url, data)
    this.codeType(response, callback)
  }
  // 200 or another
  private codeType(response: Array<returnDataType> | returnDataType, callback: Function) {
    let code = 0
    if (Array.isArray(response)) {
      code = response[0].code
    } else {
      code = response.code
    }
    switch (code) {
      case 200:
        callback(response)
        break
      default:
        console.log(response)
    }
  }
}
export default HttpRequest
