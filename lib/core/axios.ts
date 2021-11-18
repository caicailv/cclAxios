import { AxiosRequestConfig } from '../types/index'
import defaultConfig from '../default'
import xhr from '../xhr'
export default class Axios {
  constructor(){}

  request(url: string, config: AxiosRequestConfig) {
    return xhr({ url, ...config })
  }
}
