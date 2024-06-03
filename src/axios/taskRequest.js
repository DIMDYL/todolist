import axios from '@/axios/basic.js'

export let queryRequest = (params) => {
  return axios.get('/task/query', {
    params
  })
}
export let addTaskRequest = (params) => {
  return axios.post('/task/addTask', params)
}
export let modiyStatusRequest = (id, status) => {
  return axios.put('/task/modifyStatus/' + id + '/' + status)
}
export let editTaskContentRequest = (param) => {
  return axios.put('/task/edit', param)
}
export let deleteTaskRequest = (id) => {
  return axios.delete('/task/' + id)
}
