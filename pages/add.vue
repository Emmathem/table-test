<template>
  <div>
    <v-container fluid style="border: 1px solid #333">
      <v-row dense class="flex-row" align="center">
        <v-col><v-text-field v-model="form.name" label="Search by Name or Email" /></v-col>
        <v-col>
          <v-select
            :items="[]"
            label="Outlined style"
            outlined
          ></v-select>
        </v-col>
        <v-col>3</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      form: {},
    }
  },
}
</script>

<style scoped>

</style>
