<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-bind="props" class="ml-1 mr-1" :icon="icon" />
    </template>
    <v-list>
      <v-list-subheader v-if="showSubheader" class=" font-weight-black">{{ subheader }}</v-list-subheader>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
        @click="onClick(item.value)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
  export default {
    props: {
      items: {
        type: Array as () => { title: string; value: string }[],
        default: () => [],
      },
      onClick: {
        type: Function,
        default: () => {},
      },
      icon: {
        type: String,
        default: '',
      },
      showSubheader: {
        type: Boolean,
        default: false,
      },
      subheader: {
        type: String,
        default: '',
      },
    },
  }
</script>
