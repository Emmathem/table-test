<!--<template lang="pug">
  div
   v-data-table(
    :headers="headers"
    :items="items"
    item-key="email"
     template(
     v-slot:item.user="{ item }"
     item.user.title
   )
</template>-->
<template>
  <div class="mt-10">
    <v-row dense class="flex-row" align="center" justify="space-between">
      <v-col>
        <v-text-field
        v-model="searchTerm"
        append-icon="mdi-magnify"
        label="Search by First, Last Name or Email"
      />
      </v-col>
      <v-col>
        <v-select
          v-model="form.gender"
          :items="getGenders"
          label="Select Gender"
          @change="filterRecordByOption($event, 'gender')"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="form.country"
          :items="getCountry"
          label="Select Country"
          @change="filterRecordByOption($event, 'country')"
        />
      </v-col>
      <v-col>
        <v-btn v-show="showBtn" depressed color="primary" @click="resetField">Reset</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="getFilteredList"
      item-key="email"
      class="elevation-1 mt-4"
      :items-per-page="pageObj.size"
      :show-current-page="true"
      :server-items-length="getPaginationData.totalLength"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 30, 40, 50]
      }"
      @pagination="paginatePage"
      loading-text="Fetching, please wait..."
      :loading="loading"
    >
      <template v-slot:item.user="{ item }">
        <span>{{ item.user.title }} {{ item.user.first_name }} {{ item.user.last_name }}</span>
      </template>
      <template v-slot:item.sales="{ item }">
        <span v-html="getCurrencySymbol(item.currency)" />
        <span>{{ item.sales | amountFormat }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Country from '../static/countries.json';

export default {
  props: ['headers', 'items', 'getPaginationData', 'loading', 'allRecords'],
  data() {
    return {
      searchTerm: '',
      form: {},
      pageCount: 0,
      pageObj: {
        page: 1,
        size: 10,
      },
    }
  },
  computed:{
    getGenders() {
      const seen = new Set();
      const filterOut =  this.allRecords.filter(item => {
        const duplicate = seen.has(item.gender);
        seen.add(item.gender);
        return !duplicate;
      });
      return filterOut.map((res) => res.gender)
    },
    getCountry() {
      return Country.map((res) => res.name);
    },
    getFilteredList() {
      let searchResults = [];
      const data = this.items;
      searchResults = data.filter((item) => {
        const user = item.user || {};
        return (
          user.first_name.toLowerCase().match(this.searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().match(this.searchTerm.toLowerCase()) ||
          item.email.toLowerCase().match(this.searchTerm.toLowerCase())
        );
      });
      return searchResults;
    },
    showBtn() {
      return Object.keys(this.form).length > 0;
    },
  },
  methods: {
    resetField() {
      this.$emit('resetFields');
      this.form = {};
    },
    paginatePage($event) {
      this.$emit('paginatePage', $event)
    },
    filterRecordByOption(value, type) {
      if (type === 'gender') {
        this.$emit('filterItemsByGender', value);
      } else {
        this.$emit('filterItemsByCountry', value);
      }
    },
  },
}
</script>

<style lang="sass" scoped>
  .v-data-table
    max-width: 100%
</style>
