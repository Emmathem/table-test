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
    <v-row dense class="flex-row" align="center">
      <v-col><v-text-field v-model="searchTerm" label="Search by First, Last Name or Email" /></v-col>
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
    </v-row>
    <v-data-table :headers="headers" :items="getFilteredList" item-key="email" class="elevation-1 mt-4">
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
export default {
  props: ['headers', 'items'],
  data() {
    return {
      searchTerm: '',
      form: {},
    }
  },
  computed:{
    getGenders() {
      const seen = new Set();
      const filterOut =  this.items.filter(item => {
        const duplicate = seen.has(item.gender);
        seen.add(item.gender);
        return !duplicate;
      });
      return filterOut.map((res) => res.gender)
    },
    getCountry() {
      const seen = new Set();
      const filtered = this.items.filter(item => {
        const getDuplicate = seen.has(item.country);
        seen.add(item.country);
        return !getDuplicate;
      })
      return filtered.map((res) => res.country).sort();
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
  },
  methods: {
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
