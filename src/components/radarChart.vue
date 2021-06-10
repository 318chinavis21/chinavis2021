<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import * as d3 from "d3";
import _ from "lodash";

import raw_data from "../assets/data2.json";

const dimensions = ["PM2.5", "PM10", "CO", "NO2", "SO2", "O3"];

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
          indicator: dimensions.map((d) => ({
            name: d,
            max: this.upperBound[d],
            min: this.lowerBound[d],
          })),
        },
        series: [
          {
            name: "空气质量",
            type: "radar",
            areaStyle: {},
            data: [
              {
                value: dimensions.map((d) =>
                  Math.max(
                    Math.min(this.values[d], this.upperBound[d]),
                    this.lowerBound[d]
                  )
                ),
              },
            ],
          },
        ],
      };
    },
    values() {
      if (this.$store.state.selectedStation.length <= 0) {
        return {};
      } else {
        let res = {};
        for (const key of dimensions) {
          res[key] = _.round(
            d3.mean(this.$store.state.selectedStation, (d) => d[key]),
            2
          );
        }
        return res;
      }
    },
    timeData() {
      return JSON.parse(raw_data[this.$store.state.timeStamp]);
    },
    lowerBound() {
      let res = {};
      for (const key of dimensions) {
        res[key] = d3.min(this.timeData, (d) => d[key]);
      }
      return res;
    },
    upperBound() {
      let res = {};
      for (const key of dimensions) {
        res[key] = d3.quantile(this.timeData, 0.95, (d) => d[key]);
      }
      return res;
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
