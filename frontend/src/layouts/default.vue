<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <button-menu
        :items="locales"
        :icon="'mdi-translate'"
        :show-subheader="true"
        subheader="sei la"
        :on-click="setLocale"
      />
      <button-menu
        :items="themes"
        :icon="getIconTheme"
        :on-click="setTheme"
      />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="item in drawerList" :key="item.title" link :to="item.to" :disabled="item.disabled">
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
      <app-footer/>
    </v-main>
  </v-app>
</template>

<script lang="ts">

import { useAppStore } from '@/stores/app';
import ButtonMenu from '@/components/button-menu.vue';

export default {
  name: 'DefaultLayout',
  components: { ButtonMenu },
  data: () => ({
    currentTheme: localStorage.getItem('theme') || 'light',
    drawer: null,
    isUserLoggedIn: false,
    dialogOpen: false,
    title: null,
  }),
  setup() {
    const appStore = useAppStore();
    return {appStore};
  },
  computed: {
    getIconTheme(): string {
      switch (this.currentTheme) {
        case 'dark':
          return 'mdi-weather-night';
        case 'light':
          return 'mdi-white-balance-sunny';
        default:
          return '';
      }
    },
    locales() {
      return [
        {title: 'pt', value: 'pt'},
        {title: 'en', value: 'en'},
      ];
    },
    themes() {
      return [
        {title: 'dark theme', value: 'dark'},
        {title: 'light theme', value: 'light'},
        {title: 'system theme', value: 'system'},
      ];
    },
    drawerList() {
      return [
        {title: 'students', icon: 'mdi-book', to: '/books', disabled: false},
      ];
    },
  },
  methods: {
    setTheme(theme: string) {
      if (theme === 'system') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }
      this.$vuetify.theme.global.name = theme;
      localStorage.setItem('theme', theme);
      this.currentTheme = theme;
    },
    setLocale(locale: string) {
      // i18n.global.locale = locale;
      localStorage.setItem('locale', locale);
    },
  },
  mounted() {
    watch(() => this.$route.path, () => {
      const routeItem = this.drawerList.find(item => item.to === this.$route.path);
      this.title = routeItem?.title ?? 'Grupo A';
    }, {immediate: true});
  },
}
</script>
