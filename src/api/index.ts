import axios from 'axios'
import store from '@/store'
import _ from 'lodash'
import { showToast } from '@/utils'
import { getErrorMessage } from '@/api/message'

const TOKEN_HEADER = 'Bearer '

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5 * 1000,
})

console.log('api server baseURL', instance.defaults.baseURL)

const errorHandler = (error: any) => {
  store.commit('setNetworkStatus', false)

  if(error.response.config.silent !== true) {
    showToast(getErrorMessage(error.response.data.message), 'danger')
  }

  return Promise.reject(error)
}

instance.interceptors.request.use(config => {
  store.commit('setNetworkStatus', true)
  return config
}, errorHandler)

instance.interceptors.response.use(response => {
  store.commit('setNetworkStatus', false)

  if(response.data.success !== true) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(response.config.silent !== true) {
      showToast(getErrorMessage(response.data.message), 'danger')
    }

    return Promise.reject(response)
  }

  return _.get(response, 'data.resultData', {})
}, errorHandler)

interface QueryOption {
  url: string,
  method?: 'get' | 'post' | 'put' | 'delete',
  data?: object,
  silent?: boolean,
  auth?: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/**
 * api 요청하는 함수
 */
const query = (options: QueryOption) => {
  const { url, method = 'get', data, silent = false, auth = true } = options

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if(!url) {
    console.log('url이 비어있는 axios 요청.')
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(false)
  }

  const sendDataName = method.toLowerCase() === 'get' ? 'params' : 'data'

  let headers = {}
  const token = localStorage.getItem('token')
  const publicKey = localStorage.getItem('publicKey')
  if(auth && !!token && !!publicKey) {
    headers = {
      Authorization: TOKEN_HEADER + token,
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return instance({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    url,
    method,
    [sendDataName]: data,
    headers,
    silent,
    ...options,
  })
}

export default query
export { getErrorMessage }
