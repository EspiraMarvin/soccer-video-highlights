// import something here
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://www.scorebat.com/video-api/v1'
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
export { axiosInstance, axios }
