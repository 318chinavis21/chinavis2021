<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title>
        <v-icon> mdi-weather-windy </v-icon>
        空气质量可视分析系统
      </v-app-bar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>
</style>