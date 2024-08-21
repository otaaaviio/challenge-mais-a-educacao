<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row class="fill-height">
      <v-col class="d-flex flex-column pt-16 align-center bg-l-l" cols="12" md="7">
        <h1 class="t-l">{{ t('welcome') }}</h1>
        <v-container max-width="500px">
          <p class="text-center t-l-s">{{ t('welcome message') }}</p>
        </v-container>
        <img alt="login-img" class="mt-auto" src="@/assets/login.svg">
      </v-col>
      <v-col class="bg-l-r bg-blue-darken-4 elevation-11" cols="12" md="5">
        <v-window v-model="step">
          <v-window-item :value="1">
            <div class="mr-3 align-center d-flex justify-end">
              <v-btn class="bg-transparent" icon="mdi-arrow-right-thick" @click="step++" />
            </div>
            <sign-in />
          </v-window-item>
          <v-window-item :value="2">
            <div class="mr-3 align-center d-flex justify-end">
              <v-btn class="bg-transparent" icon="mdi-arrow-left-thick" @click="step--" />
            </div>
            <sign-up />
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    data () {
      return {
        step: 1,
        currentTheme: localStorage.getItem('theme'),
        user: JSON.parse(sessionStorage.getItem('user') || '{}'),
      }
    },
    mounted () {
      this.$vuetify.theme.global.name = 'dark'
    },
    beforeUnmount () {
      this.$vuetify.theme.global.name = this.currentTheme
    },
  })
</script>
