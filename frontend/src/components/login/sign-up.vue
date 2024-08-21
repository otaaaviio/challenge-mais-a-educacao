<template>
  <v-card-text>
    <h2 class="text-center t-l" v-text="t('register')" />
    <v-form ref="form" class="d-flex justify-center align-center" @submit.prevent="signUpSubmit">
      <v-col cols="12" sm="10">
        <v-text-field
          v-model="user.name"
          class="mb-3 t-l-s"
          dense
          :label="t('name')"
          :rules="[() => /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(user.email) || t('name required')]"
          variant="outlined"
        />
        <v-text-field
          v-model="user.email"
          class="mb-3 t-l-s"
          dense
          label="Email"
          :rules="[() => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email) || t('invalid email')]"
          variant="outlined"
        />
        <input-password
          v-model="user.password"
          class="mb-3 t-l-s"
          :label="t('password')"
          :password="user.password"
          :show-password="showPassword"
          @click:append-inner="showPassword = !showPassword"
        />
        <input-password
          v-model="user.confirmPassword"
          class="mb-1 t-l-s"
          :label="t('password confirmation')"
          :password="user.confirmPassword"
          :show-password="showConfirmPassword"
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
        />
        <v-row>
          <v-checkbox
            :label="t('accept terms')"
            :v-model="acceptTerms"
            @input="acceptTerms = !acceptTerms"
          />
        </v-row>
        <div class="d-flex justify-center">
          <v-btn class="text-black bg-b" type="submit">{{ t('create account') }}</v-btn>
        </div>
      </v-col>
    </v-form>
  </v-card-text>
</template>

<script lang="ts">
  import { toast } from 'vue3-toastify'
  import { useAuthStore } from '@/stores/auth'

  export default {
    data: () => ({
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      showPassword: false,
      showConfirmPassword: false,
      acceptTerms: false,
    }),
    methods: {
      signUpSubmit () {
        const authStore = useAuthStore()

        if (!this.user.name || !this.user.email || !this.user.password || !this.user.confirmPassword) {
          return toast.error(this.t('all fields required'))
        }

        if (this.user.password !== this.user.confirmPassword) {
          return toast.error(this.t('password match'))
        }

        if (!this.acceptTerms) {
          return toast.error(this.t('not accept terms'))
        }

        if (this.$refs.form.validate()) {
          authStore.register(this.user)
        }
      },
    },
  }
</script>
