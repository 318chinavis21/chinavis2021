<template>
  <div>
    <v-card
      v-for="item in drawer"
      class="ma-2"
      :key="item.title"
      elevation="2"
      rounded
    >
      <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
      <v-card-title class="text-body-1 py-2">
        {{ item.title }}
        <v-spacer></v-spacer>
        <v-btn icon color="green" @click="insertIntoDashboard(item)">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      drawer: (state) => state.layout.drawer,
    }),
  },
  methods: {
    ...mapMutations(["insertIntoDashboard"]),
  },
};
</script>