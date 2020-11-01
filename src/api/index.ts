import HttpRequest from './httpRequest'
import REQUEST_NAME from './requestName'
import { returnDataType } from '../type/http-request.type'

class RequestData {
  public httpRequest: HttpRequest
  constructor() {
    this.httpRequest = new HttpRequest()
  }
  public httpGET: Function = <T>(RequestName: string, params: T) => {
    return new Promise(resolve => {
      this.httpRequest.get<T>(REQUEST_NAME[RequestName], params, (data: returnDataType) => {
        resolve(data)
      })
    })
  }

  public httpPOST: Function = <T>(RequestName: string, params: T) => {
    return new Promise(resolve => {
      this.httpRequest.post<T>(REQUEST_NAME[RequestName], params, (data: returnDataType) => {
        resolve(data)
      })
    })
  }
}
const request = new RequestData()

export default request
