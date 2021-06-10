<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "radarChart",
  computed: {
    options: function () {
      return {
        title: {
          text: "污染物质雷达图",
          top: "10px",
          left: "10px",
        },
        tooltip: {
          trigger: "item",
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "PM2.5", max: 115 },
            { name: "PM10", max: 250 },
            { name: "CO", max: 14 },
            { name: "NO2", max: 180 },
            { name: "SO2", max: 475 },
            { name: "O3", max: 215 },
          ],
        },
        series: [
          {
            name: "XX空气质量",
            type: "radar",
            areaStyle: {},
            data: [
              {
                value: [
                  // rawToAqi("pm25", this.values["PM2.5"], "CN"),
                  // rawToAqi("pm10", this.values["PM10"], "CN"),
                  // rawToAqi("co", this.values["CO"], "CN"),
                  // rawToAqi("no2", this.values["NO2"], "CN"),
                  // rawToAqi("so2", this.values["SO2"], "CN"),
                  // rawToAqi("o3", this.values["O3"], "CN"),
                  Math.min(this.values["PM2.5"], 115),
                  Math.min(this.values["PM10"], 250),
                  Math.min(this.values["CO"], 14),
                  Math.min(this.values["NO2"], 180),
                  Math.min(this.values["SO2"], 475),
                  Math.min(this.values["O3"], 215),
                ],
              },
            ],
          },
        ],
      };
    },
    values() {
      return this.$store.state.selectedStation.length > 0
        ? this.$store.state.selectedStation[0]
        : {};
    },
  },
  mounted() {
    this.radarChart = echarts.init(this.$el);
    this.radarChart.setOption(this.options);
  },
  watch: {
    options() {
      this.radarChart.setOption(this.options);
    },
  },
};
</script>

<style scoped>
</style>
