import axios from '@/axios/basic.js'

export let verifyUser = () => {
  return axios.get('/user/verifyUser')
}
export let queryUserRequest = (id) => {
  return axios.get('/user/' + id)
}

export let loginRequest = (params) => {
  return axios.post('/user/login', params)
}

export let signupRequest = (params) => {
  return axios.post('/user/signup', params)
}

export let editRequest = (params) => {
  return axios.put('/user/edit', params)
}
export let sendIdentifyingCodeRequest = (params) => {
  return axios.post('/user/sendIdentifyingCode', params)
}
