import axios, { AxiosInstance, HttpStatusCode } from 'axios'
import router from '@/router'

const API: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
})

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === HttpStatusCode.Unauthorized) {
      router.push('/login')
    }
    return Promise.reject(err)
  },
)

export default API
