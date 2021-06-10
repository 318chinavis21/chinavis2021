<template>
  <div style="width:100%; height:100%"></div>
</template>

<script>
import * as echarts from "echarts"
import {mapState} from "vuex";
import axios from "axios"
import raw_data from "@/assets/data2.json";
import moment from "moment"
export default {
  name: "lineChart",
  data: () => ({
    date: "",
    xDates: [],
    trueData: [],
    preData: []
  }),
  methods: {
    getAQI(lat, lon){
      let param = new URLSearchParams()
      console.log(lat, lon)
      param.append('time', "2018011500/")
      param.append('lat', lat) //改
      param.append('lon', lon) //改
      axios
          .get("/api/pre_AQI/2018011500/" + String(lat) + "/" + String(lon), param)
          .then(response => {
            this.trueData = []
            for(var i = 0; i < 15; i++){
              this.trueData.push(parseInt(response.data[i]['AQI']))
              //this.trueData.push(1)
            }
            this.preData = ['null', 'null', 'null', 'null', 'null', 'null', 'null']
            for(var i = 7; i < 15; i++){
              this.preData.push(parseInt(response.data[i]['pre_AQI']))
              //this.preData.push(1.5)
            }
            this.lineChart.setOption(this.options)
            console.log(response)
          })
          .catch(response => {
            console.log(response);
          });
    },
    getInfStation(val){
      let param = new URLSearchParams()
      param.append('time', "2018011500/")
      param.append('stations', val) //改
      var root = JSON.stringify(val)
      axios
          .get("/api/influence/2018011500/" + root, param)
          .then(response => {
            this.getAQI(response.data[0], response.data[1])
            this.$store.commit("station", [response.data[0], response.data[1]]);
            console.log(response)
          })
          .catch(response => {
            console.log(response);
          });
    }
  },
  computed: {
    ...mapState(["timeStamp", "selectedStation"]),
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
          data: this.xDates,
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
          data: this.trueData,
          markLine: {
            symbol: ['none', 'none'],
            label: {show: false}
          },
          smooth: true,
          markArea: {
            itemStyle: {
              color: 'rgba(255, 173, 177, 0.4)'
            },
            data: [ [{
              name: '预测情况',
              xAxis: '2018-01-15'
            }, {
              xAxis: '2018-01-22'
            }] ]
          }
        },{
          name: '预测值',
          type: 'line',
          smooth: true,
          data: this.preData
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
    },
    timeStamp(val) {
      this.date = val
      this.xDates = ['2018-01-08', '2018-01-09', '2018-01-10', '2018-01-11', '2018-01-12', '2018-01-13', '2018-01-14', '2018-01-15', '2018-01-16', '2018-01-17', '2018-01-18', '2018-01-19', '2018-01-20', '2018-01-21', '2018-01-22']
    },
    selectedStation(val){
      var stations = []
      for(var i = 0; i < val.length; i++){
        stations.push([val[i]['lat'], val[i]['lon']])
      }
      console.log(stations)
      this.getInfStation(stations)
      //this.getAQI()
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
