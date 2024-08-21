<template>
  <v-text-field
    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    class="t-l-s"
    :label="label"
    :rules="[
      () => !!password || !required || t('password required'),
      () => password.length >= 6 || !required || t('password length'),
    ]"
    :type="showPassword ? 'text' : 'password'"
    variant="outlined"
  />
</template>

<script lang="ts">
  export default {
    props: {
      showPassword: {
        type: Boolean,
        default: false,
      },
      password: {
        type: String,
        default: null,
      },
      label: {
        type: String,
        default: null,
      },
      required: {
        type: Boolean,
        default: true,
      },
    },
  }
</script>
