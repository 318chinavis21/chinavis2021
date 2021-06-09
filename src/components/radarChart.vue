<template>
  <div style="width:100%; height:100%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "radarChart",
  computed: {
    options: function (){
      return {
        title: {
          text: '污染物质雷达图',
          top: '10px',
          left: '10px'
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            {name: 'AQI', max: 300},
            {name: 'PM2.5', max: 250},
            {name: 'PM10', max: 300},
            {name: 'CO', max: 5},
            {name: 'NO2', max: 200},
            {name: 'SO2', max: 100},
            {name: 'O3', max: 100}
          ],
        },
        series: [{
          name: 'XX空气质量',
          type: 'radar',
          areaStyle: {},
          data: [
            {
              value: [200, 150, 200, 3, 160, 80, 60]
            }
          ]
        }]
      }
    }
  },
  mounted() {
    this.radarChart = echarts.init(this.$el);
    this.radarChart.setOption(this.options);
  }
}
</script>

<style scoped>

</style>
