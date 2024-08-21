<template>
  <v-container class="justify-center d-flex">
    <delete-modal
      v-model="dialogDeleteOpen"
      :close-dialog="closeDeleteDialog"
      :student-id="currentStudentId"
      :subtitle="t('subtitleModalStudentDelete')"
      :theme-color="themeColor"
      :title="t('titleModalStudentDelete')"
    />
    <v-card class="d-flex flex-column bg-dark" max-width="1000">
      <v-card-title class="d-flex align-center">
        <v-text-field
          v-model="search"
          class="rounded-lg"
          density="compact"
          flat
          hide-details
          :label="t('searchRA')"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="solo-filled"
        />
        <v-btn
          class="ml-2"
          :class="tableColorTheme"
          @click="redirectToManageStudent()"
        >{{ t('registerNewStudent') }}
        </v-btn>
      </v-card-title>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :class="tableColorTheme"
        :headers="headers"
        item-value="ra"
        :items="students"
        :items-length="studentStore.totalData"
        :items-per-page-options="[10, 25, 50, 100]"
        :items-per-page-text="t('itemsPerPage')"
        :loading="loading"
        :loading-text="t('loading')"
        :mobile="isMobile"
        :no-data-text="t('noData')"
        :search="search"
        @update:options="loadItems"
      >
        <template #item.actions="{ item }">
          <v-btn :class="tableColorTheme" elevation="0" icon="mdi-file-edit-outline" @click="redirectToManageStudent(item.id)" />
          <v-btn
            class="ml-4"
            :class="tableColorTheme"
            elevation="0"
            icon="mdi-delete-outline"
            @click="openDialog(item.id)"
          />
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import { mapState } from 'pinia'
  import { useStudentStore } from '@/stores/student'
  import debounce from 'lodash/debounce'
  import router from '@/router'

  export default {
    name: 'Students',
    setup () {
      const studentStore = useStudentStore()

      onMounted(() => {
        studentStore.index()
      })

      return { studentStore }
    },
    data () {
      return {
        search: '',
        itemsPerPage: 10,
        currentStudentId: 0,
        loading: false,
        dialogDeleteOpen: false,
        headers: [
          { title: '', value: 'ra', key: 'ra' },
          { title: '', value: 'name', key: 'name' },
          { title: 'CPF', value: 'cpf', key: 'cpf' },
          { title: '', key: 'actions', sortable: false },
        ],
      }
    },
    computed: {
      tableColorTheme () {
        return this.$vuetify.theme.name === 'dark' ? '' : 'bg-light'
      },
      themeColor () {
        return this.$vuetify.theme.name === 'dark' ? 'bg-dark' : 'bg-light'
      },
      ...mapState(useStudentStore, ['students']),
      isMobile () {
        return this.$vuetify.display.mobile
      },
    },
    mounted () {
      this.headers[0].title = this.t('ra')
      this.headers[1].title = this.t('name')
    },
    methods: {
      loadItems: debounce(function ({ page, itemsPerPage, sortBy }) {
        this.loading = true
        this.studentStore.index(page, itemsPerPage, sortBy, this.search).then((data: any) => {
          this.studentStore.$state.students = data.data
          this.studentStore.$state.totalData = data.totalData
          this.loading = false
        })
      }, 300),
      redirectToManageStudent (id?: number) {
        if (id) { router.push('/manage-student?id=' + id) } else { router.push('/manage-student') }
      },
      closeDeleteDialog () {
        this.dialogDeleteOpen = false
      },
      openDialog (id: number) {
        this.currentStudentId = id
        this.dialogDeleteOpen = true
      },
    },
  }
</script>
