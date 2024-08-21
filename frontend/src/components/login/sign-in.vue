<template>
  <v-card-text>
    <h2 class="text-center t-l" v-text="t('login')" />
    <v-form ref="form" class="d-flex justify-center align-center" @submit.prevent="loginSubmit">
      <v-col cols="12" sm="10">
        <v-text-field
          v-model="user.email"
          class="mb-3 t-l"
          dense
          label="E-mail"
          :rules="[() => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email) || t('invalid email')]"
          variant="outlined"
        />
        <input-password
          v-model="user.password"
          :label="t('password')"
          :password="user.password"
          :show-password="showPassword"
          @click:append-inner="showPassword = !showPassword"
        />
        <div class="d-flex justify-center">
          <v-btn class="text-black bg-b" type="submit">{{ t('login') }}</v-btn>
        </div>
      </v-col>
    </v-form>
  </v-card-text>
</template>

<script lang="ts">
  import 'vue3-toastify/dist/index.css'
  import InputPassword from './input-password.vue'
  import { useAuthStore } from '@/stores/auth'

  export default {
    components: { InputPassword },
    data: () => ({
      user: {
        email: '',
        password: '',
      },
      showPassword: false,
    }),
    methods: {
      async loginSubmit () {
        const authStore = useAuthStore()

        const validator = await this.$refs.form.validate()
        if (validator.valid) {
          authStore.login(this.user)
        }
      },
    },
  }
</script>
