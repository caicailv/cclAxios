import Axios from './core/axios'
import defaultConfig from './default'
import { AxiosRequestConfig } from './types'
import CancelToken from './cancel/CancelToken'
function getAxios(config: AxiosRequestConfig) {
  const context = new Axios(config)
  //此处如不使用bind,则在request混入 this.defaultConfig的时候,会因为丢失this而报错
  const axios = Axios.prototype.request.bind(context)
  for (const key in context) {
    axios[key] = context[key]
  }
  axios.create = (config: AxiosRequestConfig) =>
    getAxios({ ...defaultConfig, ...config })
  return axios
}
const axios = getAxios(defaultConfig)
axios.CancelToken = CancelToken
export default axios
