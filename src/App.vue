<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app right>
      <panel></panel>
    </v-navigation-drawer>
    <v-app-bar dense app color="primary">
      <v-app-bar-title>
        <v-icon> mdi-weather-windy </v-icon>
        空气质量可视分析系统
      </v-app-bar-title>

      <v-spacer></v-spacer>
      <v-btn @click="drawer = !drawer" icon><v-icon>mdi-widgets</v-icon></v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Panel from "./components/Panel.vue";
export default {
  name: "App",

  data: () => ({
    drawer: false,
  }),

  components: {
    Panel,
  },
};
</script>

<style scoped>
</style>