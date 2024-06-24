import axios from '@/axios/basic.js'


export let loginRequest = (params) => {
  return axios.post('/user/login', params)
}

export let signupRequest = (params) => {
  return axios.post('/user/signup', params)
}
export let queryUserRequest = (id) => {
  return axios.get('/user/' + id)
}
export let editRequest = (params) => {
  return axios.put('/user/edit', params)
}
export let editPasswordRequest = (password)=>{
  return axios.put("/user/edit/"+password)
}
export let verifyUser = () => {
  return axios.get('/user/verifyUser')
}
export let verifyIdentityRequest = (params) => {
  return axios.post('/user/verifyIdentity',params)
}
export let isExistedForUserWithUserName = (username) => {
  return axios.get('/user/isExistedForUserWithUserName/' + username)
}
export let sendIdentifyingCodeRequest = (params) => {
  return axios.post('/user/sendIdentifyingCode', params)
}


