import API from '../api'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { i18n } from '@/plugins/i18n'
import router from '@/router'
import { ILogin, IRegister, IUser } from '@/interfaces/auth'
import { HttpStatusCode } from 'axios'

const apiRoute = '/auth'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: (JSON.parse(sessionStorage.getItem('user')))?.user as IUser,
  }),
  actions: {
    clearUser () {
      const invalidUser: IUser = { id: -1, name: '', email: '' }
      this.user = invalidUser
      sessionStorage.setItem('user', JSON.stringify(invalidUser))
      return invalidUser
    },
    setUser (user: IUser) {
      this.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    login (payload: ILogin) {
      API.post(`${apiRoute}/login`, payload)
        .then(res => {
          this.setUser(res.data.user)
          router.push('/', payload).then(() => {
            toast.success(i18n.global.t('login successfully'))
          })
        })
        .catch(err => {
          if (err.response?.status === HttpStatusCode.NotFound) toast.error(i18n.global.t('user not found'))
          else if (err.response?.status === HttpStatusCode.Unauthorized) toast.error(i18n.global.t('invalid credentials'))
          else toast.error(i18n.global.t('an error occurred'))
        })
    },
    register (payload: IRegister) {
      API.post(`${apiRoute}/register`, payload)
        .then(res => {
          this.setUser(res.data.user)
          router.push('/').then(() => {
            toast.success(i18n.global.t('register successfully'))
          })
        })
        .catch(err => {
          if (err.response?.data.message === 'Unique constraint failed on the fields: email') { toast.error(i18n.global.t('email already registered')) } else toast.error(i18n.global.t('an error occurred'))
        })
    },
    logout () {
      API.get(`${apiRoute}/logout`)
        .then(() => {
          this.clearUser()
          router.push('/login').then(() => {
            toast.success(i18n.global.t('Logout successfully'))
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
})
