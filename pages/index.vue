<template>
<!--  v-container-->
<!--    v-row-->
<!--      v-col(cols)-->
<!--        DataTable(-->
<!--          v-if="items.length"-->
<!--          :headers="headers"-->
<!--          :items="items"-->
<!--        )-->
<!--        v-progress-circular(-->
<!--          v-else-->
<!--          width="2"-->
<!--          color="rs__primary"-->
<!--          indeterminate-->
<!--        ).mx-auto-->
    <v-container>
      <v-row>
        <v-col cols>
          <DataTable
            :headers="headers"
            :items="items"
            :loading="loading"
            :getPaginationData="getPaginationData"
            @resetFields="resetFields"
            @filterItemsByGender="filterItemsByGender"
            @filterItemsByCountry="filterItemsByCountry"
            @paginatePage="paginatePage"
            :all-records="sales.results"
          />
<!--          <v-progress-circular v-if="loading" width="2" color="rs__primary" indeterminate class="mx-auto" />-->
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import DataTable from '~/components/DataTable.vue'
import sales from '~/api/sales.js'

export default {
  components: {
    DataTable
  },
  data() {
    return {
      sales,
      loading: false,
      items: [],
      headers: [
        { text: 'Name', value: 'user', align: 'start' },
        { text: 'Email', value: 'email' },
        { text: 'Gender', value: 'gender' },
        { text: 'Year', value: 'year' },
        { text: 'Sales', value: 'sales' },
        { text: 'Country', value: 'country' },
      ],
    }
  },
  async created() {
    this.items = await this.fetchData(0, 10)
  },
  computed: {
    getPaginationData() {
      return {
        totalLength: sales.results.length,
      }
    },
  },
  methods: {
    async fetchData(page, size) {
      const start = page * size
      this.loading = true;
      await this.delay(1000)
      this.loading = false;
      return await sales.results.slice(start, start + size)
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async resetFields() {
      this.form = {};
      this.items = await this.fetchData(0, 10)
    },
    async paginatePage($event) {
      const { page, itemsPerPage } = $event
      this.items = await this.fetchData(page, itemsPerPage);
    },
    filterItemsByGender(value) {
      if (!value) return []
      const result = sales.results.filter((res) => res.gender === value);
      if (result.length > 0) {
        this.items = result;
      } else
        this.items = []
    },
    filterItemsByCountry(value) {
      if (!value) return;
      const result = sales.results.filter((res) => res.country === value);
      console.log(result, 'result');
      if (result.length > 0) {
        this.items = result;
      } else {
        this.$toast.info(`No record found for ${value}`);
        this.items = []
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.v-progress-circular
  position: absolute
  top: 50%
  left: 50%
</style>
