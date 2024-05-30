import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.baseURL = 'http://localhost:8080/mytodolist'

axios.interceptors.request.use((config) => {
  let userStore = JSON.parse(localStorage.getItem('userStore'))
  if (userStore != null) {
    config.headers['token'] = userStore.userInfo.token
  }
  return config
})

//错误信息返回null
axios.interceptors.response.use(
  (response) => {
    //①处理成功
    if (response.status == 200 && response.data.code == 1) {
      if (response.data.msg != null) ElMessage.info(response.data.msg)
      return response.data
    }

    //②请求失败
    if (response.status != 200) {
      ElMessage.error('请求失败')
    } else {
      //③请求成功，但返回错误
      ElMessage.error(response.data.msg)
    }
    return null
  },
  (error) => {
    ElMessage.error('请求失败')
    return null
  }
)
export default axios
