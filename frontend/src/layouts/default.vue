<template>
  <v-app id="inspire">
    <v-app-bar v-if="!isNotFoundPage">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <v-spacer />
      <button-menu
        :icon="'mdi-translate'"
        :items="locales"
        :on-click="setLocale"
        :show-subheader="true"
        :subheader="$t('language')"
      />
      <button-menu
        :icon="getIconTheme"
        :items="themes"
        :on-click="setTheme"
      />
    </v-app-bar>
    <v-navigation-drawer v-if="!isNotFoundPage" v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="item in drawerList" :key="item.title" link :to="item.to">
          <v-row align="center">
            <v-col cols="auto">
              <v-icon>{{ item.icon }}</v-icon>
            </v-col>
            <v-col>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main :class="currentTheme === 'light' ? 'bg-grey-lighten-2' : ''">
      <router-view />
      <app-footer v-if="!isNotFoundPage" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import ButtonMenu from '@/components/button-menu.vue'
  import { i18n } from '@/plugins/i18n'

  export default {
    name: 'DefaultLayout',
    components: { ButtonMenu },
    data: () => ({
      currentTheme: localStorage.getItem('theme') || 'light',
      drawer: false,
      title: '',
    }),
    computed: {
      isNotFoundPage () {
        return this.$route.name === '/notfound'
      },
      getIconTheme (): string {
        switch (this.currentTheme) {
          case 'dark':
            return 'mdi-weather-night'
          case 'light':
            return 'mdi-white-balance-sunny'
          default:
            return ''
        }
      },
      locales () {
        return [
          { title: this.$t('br'), value: 'br' },
          { title: this.$t('en'), value: 'en' },
        ]
      },
      themes () {
        return [
          { title: this.$t('darkTheme'), value: 'dark' },
          { title: this.$t('lightTheme'), value: 'light' },
          { title: this.$t('systemTheme'), value: 'system' },
        ]
      },
      drawerList () {
        return [
          { title: this.$t('home'), icon: 'mdi-home-circle-outline', to: '/' },
          { title: this.$t('students'), icon: 'mdi-account-school-outline', to: '/students' },
        ]
      },
    },
    mounted () {
      watch(() => this.$route.path, () => {
        const routeItem = this.drawerList.find(item => item.to === this.$route.path)
        this.title = routeItem?.title ?? 'Grupo A'
      }, { immediate: true })
    },
    methods: {
      setTheme (theme: string) {
        if (theme === 'system') {
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark'
          } else {
            theme = 'light'
          }
        }
        this.$vuetify.theme.global.name = theme
        localStorage.setItem('theme', theme)
        this.currentTheme = theme
      },
      setLocale (locale: string) {
        i18n.global.locale = locale
        localStorage.setItem('locale', locale)
      },
    },
  }
</script>
