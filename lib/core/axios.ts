import { AxiosRequestConfig } from '../types/index'
import xhr from '../xhr'
export default class Axios {
  request(url: string, config: AxiosRequestConfig) {
    return xhr({ url, ...config })
  }
}
