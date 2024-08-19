<template>
  <v-container class=" align-center fill-height">
    <v-card class="pa-5 mx-auto" max-width="400" width="100%">
      <v-card-title class="justify-center align-center d-flex">
        {{ isEditing ? $t('editStudent') : $t('createStudent') }}
      </v-card-title>
      <v-form ref="form" @submit.prevent="checkForm">
        <v-text-field
          v-for="f in fields"
          :key="f.name"
          v-model="f.value"
          class="mb-2"
          color="blue"
          :disabled="isEditing && !f.editable"
          :label="$t(`${f.name}`)"
          outlined
          :rules="f.rules"
          variant="outlined"
          @input="f.name === 'cpf' ? applyCpfMask(f) : null"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn
            :text="$t('cancel')"
            @click="$router.push('/students')"
          />
          <v-btn
            :text="$t('save')"
            type="submit"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import { useStudentStore } from '@/stores/student'
  import { i18n } from '@/plugins/i18n'

  export default {
    name: 'ManageStudent',
    setup () {
      const route = useRoute()
      const studentStore = useStudentStore()
      const isEditing = ref(false)
      const studentId = ref(Number(route.query.id))
      const fields = ref([
        {
          name: 'name',
          value: '',
          editable: true,
          rules: [
            v => (/^[a-zA-Z\s]*$/.test(v) && v.length >= 3) || i18n.global.t('Name must be valid'),
          ],
        },
        {
          name: 'email',
          value: '',
          editable: true,
          rules: [
            v => !!v || i18n.global.t('Email is required'),
            v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || i18n.global.t('E-mail must be valid'),
          ],
        },
        {
          name: 'ra',
          value: '',
          editable: false,
          rules: [
            v => !!v || i18n.global.t('RA is required'),
          ],
        },
        {
          name: 'cpf',
          value: '',
          editable: false,
          rules: [
            v => !!v || i18n.global.t('CPF is required'),
            v => v.length === 14 || i18n.global.t('CPF must have 11 digits'),
          ],
        },
      ])

      const applyCpfMask = (field: any) => {
        let value = field.value.replace(/\D/g, '')

        if (value.length > 3) value = value.slice(0, 3) + '.' + value.slice(3)
        if (value.length > 7) value = value.slice(0, 7) + '.' + value.slice(7)
        if (value.length > 11) value = value.slice(0, 11) + '-' + value.slice(11)
        if (value.length > 14) value = value.slice(0, 14)

        field.value = value
      }

      const fetchStudent = async (id: number) => {
        studentStore.view(id)
          .then(student => {
            fields.value.forEach(field => {
              field.value = student[field.name] as string
            })
          })
      }

      const handleSubmit = async () => {
        const payload = {
          name: fields.value[0].value,
          email: fields.value[1].value,
          ra: fields.value[2].value,
          cpf: fields.value[3].value,
        }

        if (isEditing.value) { return studentStore.update(studentId.value, payload) }

        return studentStore.create(payload)
      }

      onMounted(() => {
        if (studentId.value) {
          isEditing.value = true
          fetchStudent(studentId.value)
        }
      })

      return {
        handleSubmit,
        fields,
        applyCpfMask,
        isEditing,
      }
    },
    methods: {
      async checkForm () {
        const validator = await this.$refs.form.validate()

        if (validator.valid) {
          await this.handleSubmit()
        }
      },
    },
  }
</script>
