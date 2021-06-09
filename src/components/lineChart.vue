<template>
  <div style="width:100%; height:100%"></div>
</template>

<script>
import * as echarts from "echarts"

export default {
  name: "lineChart",
  computed: {
    options: function () {
      return{
        animation: false,
        textStyle: {
          fontSize: 14
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['预测值', '真实值']
        },
        xAxis: {
          data: ['2016-04-01', '2016-04-02', '2016-04-03', '2016-04-04', '2016-04-05', '2016-04-06', '2016-04-07', '2016-04-08', '2016-04-09', '2016-04-10', '2016-04-11', '2016-04-12', '2016-04-13', '2016-04-14', '2016-04-15', '2016-04-16', '2016-04-17', '2016-04-18', '2016-04-19', '2016-04-20', '2016-04-21', '2016-04-22', '2016-04-23', '2016-04-24', '2016-04-25', '2016-04-26', '2016-04-27', '2016-04-28', '2016-04-29', '2016-04-30', '2016-05-01', '2016-05-02', '2016-05-03', '2016-05-04', '2016-05-05', '2016-05-06', '2016-05-07', '2016-05-08', '2016-05-09', '2016-05-10', '2016-05-11', '2016-05-12', '2016-05-13', '2016-05-14', '2016-05-15', '2016-05-16', '2016-05-17', '2016-05-18', '2016-05-19', '2016-05-20', '2016-05-21', '2016-05-22', '2016-05-23', '2016-05-24', '2016-05-25', '2016-05-26', '2016-05-27', '2016-05-28', '2016-05-29', '2016-05-30'],
          boundaryGap: true
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '真实值',
          type: 'line',
          stack: 'all',
          symbolSize: 6,
          data: [1.7, 1.2, 0.3, 0.4, 0.1, 1.2, 0.7, 1.9, 0.6, 0.3, 0.1, 0.1, 1.3, 0.7, 0.0, 1.2, 1.3, 1.2, 0.7, 0.2, 0.1, 0.9, 2.0, 1.3, 0.4, 1.1, 0.5, 1.1, 2.0, 0.7, 1.8, 0.3, 2.0, 0.2, 1.1, 1.0, 0.9, 1.0, 1.8, 1.7, 1.7, 2.0, 1.1, 2.0, 2.0, 0.7, 0.1, 1.0, 0.7, 1.0, 0.0, 0.3, 1.0, 0.6, 2.0, 0.6, 1.2, 1.2, 0.4, 1.2],
          markLine: {
            symbol: ['none', 'none'],
            label: {show: false},
            data: [
              {xAxis: '2016-04-30'}
            ]
          },
          markArea: {
            itemStyle: {
              color: 'rgba(255, 173, 177, 0.4)'
            },
            data: [ [{
              name: '预测情况',
              xAxis: '2016-04-30'
            }, {
              xAxis: '2016-05-30'
            }] ]
          }
        },{
          name: '预测值',
          type: 'line',
          data: ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 0.7, 1.7, 0.5, 1.0, 1.5, 0.3, 1.8, 1.8, 0.1, 1.0, 1.2, 1.2, 0.6, 1.4, 1.4, 1.9, 1.7, 1.7, 1.0, 0.9, 0.8, 0.1, 0.6, 0.3, 0.4, 1.2, 0.0, 1.3, 0.4, 1.0, 1.8]
        }],
        grid: {
          top: 30,
          left: 60,
          right: 60,
          bottom: 40
        }
      }
    }
  },
  watch: {
    setOption: function(){
      this.lineChart.setOption(this.options)
      this.lineChart.resize()
    }
  },
  mounted() {
    this.lineChart = echarts.init(this.$el);
    this.lineChart.setOption(this.options);
    window.onresize = () =>{
      this.lineChart.resize()
    }
  }
}
</script>

<style scoped>

</style>
