// import xhr from './xhr'
import Axios from './core/axios'
import { AxiosRequestConfig } from './types/index'
import defaultConfig from './default'
function getAxios(config: AxiosRequestConfig) {
  // return function (url: string, config: AxiosRequestConfig) {
  //   return xhr({ url, ...defaultConfig, ...config })
  // }
  return Axios.prototype.request.bind(config)
}
const axios = getAxios(defaultConfig)
// export default getAxios()
 