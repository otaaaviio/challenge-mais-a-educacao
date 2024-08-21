<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <img alt="Image for page not found" class="w-25 mr-2" src="@/assets/not-found.svg">
    <v-row>
      <v-col cols="12" md="6" sm="8">
        <v-row class="align-baseline" cols="6">
          <v-card-title class="headline font-weight-black text-h1 pa-0">404</v-card-title>
          <v-col>
            <v-card-title class="pa-0">Page Not Found</v-card-title>
          </v-col>
        </v-row>
        <v-card-text class="pa-0 mt-5 mb-5">
          {{ t('notFoundSubtitle') }}
        </v-card-text>
        <v-btn class="btn" @click="goBack">{{ t('backToHome') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  export default {
    name: 'NotFound',
    methods: {
      goBack () {
        this.$router.push('/students')
      },
    },
  }
</script>
