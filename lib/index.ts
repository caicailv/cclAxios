// import xhr from './xhr'
import Axios from './core/axios'
import { AxiosRequestConfig } from './types/index'
function getAxios() {
  return Axios.prototype.request
}
const axios = getAxios()
// export default getAxios()
export default axios
