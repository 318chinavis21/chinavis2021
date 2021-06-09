<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
      offset-x
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="日期选择"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          color="accent"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="accent" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="accent" @click="$refs.menu.save(date)"> OK </v-btn>
      </v-date-picker>
    </v-menu>
    <v-select
      label="颜色通道"
      v-model="colorChannel"
      :items="colorChannels"
      item-color="accent"
    ></v-select>
    <v-select
      label="大小通道"
      v-model="sizeChannel"
      :items="sizeChannels"
      item-color="accent"
    ></v-select>
    <v-switch
      v-model="showWind"
      inset
      label="显示风速"
      color="accent"
      class="mx-3"
    ></v-switch>
  </div>
</template>

<script>
export default {
  data: () => ({
    colorChannels: [
      "PM2.5",
      "PM10",
      "SO2",
      "NO2",
      "CO",
      "O3",
      "TEMP",
      "RH",
      "PSFC",
    ],
    colorChannel: "PM2.5",
    sizeChannels: [
      "无",
      "PM2.5",
      "PM10",
      "SO2",
      "NO2",
      "CO",
      "O3",
      "TEMP",
      "RH",
      "PSFC",
    ],
    sizeChannel: "TEMP",
    showWind: false,
    date: null,
    menu: false,
  }),
};
</script>