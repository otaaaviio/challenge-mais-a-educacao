import API from '../api'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { i18n } from '@/plugins/i18n'
import { ICreateStudent, IStudent } from '@/interfaces/student'
import router from '@/router'

export const useStudentStore = defineStore({
  id: 'student',
  state: () => ({
    students: [] as IStudent[],
    totalData: 0,
    apiRoute: '/student',
  }),
  actions: {
    getMessageError (err: any) {
      let message = 'an error occurred'
      const res = err.response?.data || {}

      if (res.message === 'Unique constraint failed on the fields: cpf') { message = 'cpf already registered' }

      if (res.message === 'Unique constraint failed on the fields: ra') { message = 'ra already registered' }

      if (res.message === 'Validation error') { message = 'cpf invalid' }

      return message
    },
    index (page: number = 3, limit: number = 10, sortBy: string = '', raFilter: string = ''): Promise<void> {
      return new Promise((resolve, reject) => {
        API.get(this.apiRoute, {
          params: {
            page,
            limit,
            sortBy,
            raFilter,
          },
        })
          .then(res => {
            this.students = res.data?.data
            resolve(res.data)
          })
          .catch(err => {
            toast.error(i18n.global.t('an error occurred'))
            reject(err)
          })
      })
    },
    view (id: number) {
      return new Promise((resolve, reject) => {
        API.get(`${this.apiRoute}/${id}`)
          .then(res => {
            resolve(res.data.data)
          })
          .catch(err => {
            toast.error(i18n.global.t('an error occurred'))
            reject(err)
          })
      })
    },
    create (data: ICreateStudent) {
      API.post(this.apiRoute, data)
        .then(() => {
          router.push('/students').then(() => {
            toast.success(i18n.global.t('student registered successfully'))
          })
        })
        .catch(err => {
          const message = this.getMessageError(err)

          toast.error(i18n.global.t(message))
        })
    },
    update (id: number, data: ICreateStudent) {
      API.put(`${this.apiRoute}/${id}`, data)
        .then(() => {
          router.push('/students').then(() => {
            toast.success(i18n.global.t('student updated successfully'))
          })
        })
        .catch(err => {
          const message = this.getMessageError(err)

          toast.error(i18n.global.t(message))
        })
    },
    delete (id: number) {
      API.delete(`${this.apiRoute}/${id}`)
        .then(() => {
          this.index().then(() => {
            toast.success(i18n.global.t('student deleted successfully'))
          })
        })
        .catch(() => {
          toast.error(i18n.global.t('error deleting student'))
        })
    },
  },
})
