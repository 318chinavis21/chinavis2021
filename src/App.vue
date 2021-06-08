<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app right>
      <drawer></drawer>
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
import Drawer from "./components/Drawer.vue";
export default {
  name: "App",

  data: () => ({
    drawer: false,
  }),

  components: {
    Drawer,
  },
};
</script>

<style scoped>
</style>