import axios, { AxiosPromise } from 'axios'

export const banner: () => AxiosPromise<any> = () => {
  return axios({
    url: 'http://localhost:3000/banner?type=0',
    method: 'get'
  })
}
