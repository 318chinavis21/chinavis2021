<template>
  <div class="pa-3">
    <h3>控制面板</h3>
    <v-divider class="mb-3"></v-divider>
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
          readonly
          v-bind="attrs"
          v-on="on"
          color="accent"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        scrollable
        locale="zh-cn"
        :events="isAQIRed"
      >
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
      color="accent"
    ></v-select>
    <v-select
      label="大小通道"
      v-model="sizeChannel"
      :items="sizeChannels"
      item-color="accent"
      color="accent"
    ></v-select>
    <v-switch v-model="showWind" label="显示风向" color="accent"></v-switch>
  </div>
</template>

<script>
import configs from "../configs/defaults";

import AQIs from "../assets/AQIs.json";
import * as d3 from "d3";
import _ from "lodash";

const { colorChannel, sizeChannel, timeStamp, windChannel } = configs;

const defaultYear = timeStamp.slice(0, 4);
const defaultMonth = timeStamp.slice(4, 6);
const defaultDay = timeStamp.slice(6, 8);

let scaleColor = d3
  .scaleLinear()
  .domain([
    d3.quantile(_.values(AQIs), 0.05, (d) => d.mean_AQI),
    d3.quantile(_.values(AQIs), 0.95, (d) => d.mean_AQI),
  ])
  .range([0, 1]);

let color = (d) => {
  return d3.interpolateRdYlGn(1 - scaleColor(d));
};

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
    colorChannel: colorChannel,
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
    sizeChannel: sizeChannel || "无",
    showWind: Boolean(windChannel.offset > 0),
    date: `${defaultYear}-${defaultMonth}-${defaultDay}`,
    menu: false,
  }),
  watch: {
    date(val) {
      const [year, month, day] = val.split("-");
      this.$store.commit("setTimestamp", `${year}${month}${day}00`);
    },
    sizeChannel(val) {
      this.$store.commit("setSizeChannel", val);
    },
    colorChannel(val) {
      this.$store.commit("setColorChannel", val);
    },
    showWind(val) {
      this.$store.commit("showWind", val);
    },
  },
  methods: {
    isAQIRed(date) {
      const [year, month, day] = date.split("-");
      const AQI = (AQIs[`${year}${month}${day}00`] || { mean_AQI: 0 }).mean_AQI;
      // if (AQI > 62) {
      //   return "red";
      // } else if (AQI < 38) {
      //   return "green";
      // }
      return color(AQI);
    },
  },
};
</script>