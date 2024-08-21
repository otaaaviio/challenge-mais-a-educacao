<template>
  <v-dialog max-width="500" overlay-color="rgba(0, 0, 0, 0.5)" @click:outside="closeDialog">
    <v-card :class="themeColor" :title="title">
      <v-card-text>
        {{ subtitle }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          :text="t('cancel')"
          @click="closeDialog"
        />
        <v-btn
          :text="t('confirm')"
          @click="handleDelete"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

  import { useStudentStore } from '@/stores/student'

  export default {
    name: 'DeleteModal',
    props: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
      studentId: {
        type: Number,
        required: true,
      },
      closeDialog: {
        type: Function,
        required: true,
      },
      themeColor: {
        type: String,
        required: true,
      },
    },
    methods: {
      handleDelete () {
        const studentStore = useStudentStore()
        studentStore.delete(this.studentId)
        this.closeDialog()
      },
    },
  }
</script>
