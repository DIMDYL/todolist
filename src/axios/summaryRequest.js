import axios from '@/axios/basic.js'

export let scrollQueryRequest = (params) => {
  return axios.get('/summary/scrollQuery', {
    params
  })
}
export const getTotalNumberRequest = (id) => {
  return axios.get('/summary/getTotalNumber/' + id)
}
export let addSummaryRequest = (params) => {
  return axios.post('/summary/add', params)
}
export let editSummaryRequest = (params) => {
  return axios.put('/summary/edit', params)
}
export let deleteRequest = (id) => {
  return axios.delete('/summary/' + id)
}
