<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "transPath",
  data: () => ({
    date: "",
    stat: [104.114129, 37.550339],
    paths: [],
    pathChart: null,
  }),
  methods: {
    getPath(time, lat, lon) {
      let param = new URLSearchParams();
      param.append("time", "2018011500/");
      param.append("lat", lat); //改
      param.append("lon", lon);
      axios
        .get("/api/tpn/2018011500/" + lat + "/" + lon, param)
        .then((response) => {
          this.paths = [];
          for (var i = 0; i < response.data["PM2.5"].length; i++) {
            this.paths.push({
              coords: [
                [response.data["PM2.5"][i][9], response.data["PM2.5"][i][8]],
                [response.data["PM2.5"][i][11], response.data["PM2.5"][i][10]],
              ],
            });
            this.pathChart.setOption(this.options);
          }
          console.log(this.paths);
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
  computed: {
    ...mapState(["timeStamp", "station"]),
    options: function () {
      return {
        backgroundColor: "transparent",
        title: {
          text: "主要污染物传播路径",
          left: "center",
          top: "30px",
          textStyle: {
            color: "#000",
          },
        },
        tooltip: {
          trigger: "item",
        },
        bmap: {
          center: this.stat,
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3",
                },
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999",
                },
              },
            ],
          },
        },
        series: [
          {
            type: "lines",
            zlevel: 1, //用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，Canvas分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的zlevel。
            //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。类似于z-index吧
            coordinateSystem: "bmap",
            effect: {
              //线特效的配置
              show: true, //是否显示特效。
              period: 6, //特效动画的时间，单位为 s。
              trailLength: 0.7, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
              color: "yellow", //特效标记的颜色，默认取 lineStyle.color。
              symbol: "arrow",
              symbolSize: 10, //特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
            },
            lineStyle: {
              normal: {
                color: "blue", //线的颜色
                type: "dashed", //线的类型。'solid'，'dashed'，'dotted'
                //opacity: 0.6, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                curveness: 0, //边的曲度，支持从 0 到 1 的值，值越大曲度越大。
              },
            },
            data: this.paths,
          },
          /*
          {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.convertData(data),
            encode: {
              value: 2,
            },
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              formatter: "{b}",
              position: "right",
            },
            itemStyle: {
              color: "#ddb926",
            },
            emphasis: {
              label: {
                show: true
              }
            }

          },
          */
          /*
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: this.convertData(
              data
                .sort(function (a, b) {
                  return b.value - a.value;
                })
                .slice(0, 6)
            ),
            encode: {
              value: 2,
            },
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: "emphasis",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "#f4e925",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 2
          }*/
        ],
      };
    },
  },
  watch: {
    timeStamp(val) {
      this.date = val;
    },
    station(val) {
      this.stat = [val[0], val[1]];
      this.getPath("2018011500", val[0], val[1]);
      this.pathChart.setOption(this.options);
      console.log(val);
    },
  },
  mounted() {
    this.pathChart = echarts.init(this.$el);
    this.pathChart.setOption(this.options);
    window.onresize = () => {
      this.pathChart.resize();
    };
  },
};
</script>

<style scoped>
</style>
