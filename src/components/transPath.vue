<template>
  <div style="width:100%; height:100%"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap"

export default {
  name: "transPath",
  methods: {
    convertData: function (data) {
      var geoCoordMap = {
        '沧州':[116.83,38.33],
        '临沂':[118.35,35.05],
        '南充':[106.110698,30.837793],
        '天津':[117.2,39.13],
        '富阳':[119.95,30.07],
        '泰安':[117.13,36.18],
        '诸暨':[120.23,29.71],
        '郑州':[113.65,34.76],
        '哈尔滨':[126.63,45.75],
        '聊城':[115.97,36.45],
        '芜湖':[118.38,31.33],
        '唐山':[118.02,39.63],
        '平顶山':[113.29,33.75],
        '邢台':[114.48,37.05],
        '德州':[116.29,37.45],
        '济宁':[116.59,35.38],
        '荆州':[112.239741,30.335165],
        '宜昌':[111.3,30.7],
        '义乌':[120.06,29.32],
        '丽水':[119.92,28.45],
        '洛阳':[112.44,34.7],
        '秦皇岛':[119.57,39.95],
        '株洲':[113.16,27.83],
        '石家庄':[114.48,38.03],
        '莱芜':[117.67,36.19],
        '常德':[111.69,29.05],
        '保定':[115.48,38.85],
        '湘潭':[112.91,27.87],
        '金华':[119.64,29.12],
        '岳阳':[113.09,29.37],
        '长沙':[113,28.21],
        '衢州':[118.88,28.97],
        '廊坊':[116.7,39.53],
        '菏泽':[115.480656,35.23375],
        '合肥':[117.27,31.86],
        '武汉':[114.31,30.52],
        '大庆':[125.03,46.58]
      };
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
  },
  computed: {
    options: function (){
      var data = [
        {name: '沧州', value: 100},
        {name: '临沂', value: 103},
        {name: '南充', value: 104},
        {name: '天津', value: 105},
        {name: '富阳', value: 106},
        {name: '泰安', value: 112},
        {name: '诸暨', value: 112},
        {name: '郑州', value: 113},
        {name: '哈尔滨', value: 114},
        {name: '聊城', value: 116},
        {name: '芜湖', value: 117},
        {name: '唐山', value: 119},
        {name: '平顶山', value: 119},
        {name: '邢台', value: 119},
        {name: '德州', value: 120},
        {name: '济宁', value: 120},
        {name: '荆州', value: 127},
        {name: '宜昌', value: 130},
        {name: '义乌', value: 132},
        {name: '丽水', value: 133},
        {name: '洛阳', value: 134},
        {name: '秦皇岛', value: 136},
        {name: '株洲', value: 143},
        {name: '石家庄', value: 147},
        {name: '莱芜', value: 148},
        {name: '常德', value: 152},
        {name: '保定', value: 153},
        {name: '湘潭', value: 154},
        {name: '金华', value: 157},
        {name: '岳阳', value: 169},
        {name: '长沙', value: 175},
        {name: '衢州', value: 177},
        {name: '廊坊', value: 193},
        {name: '菏泽', value: 194},
        {name: '合肥', value: 229},
        {name: '武汉', value: 273},
        {name: '大庆', value: 279}
      ];
      return{
        backgroundColor: 'transparent',
        title: {
          text: '主要污染物传播路径',
          left: 'center',
          top: '30px',
          textStyle: {
            color: '#000'
          }
        },
        tooltip : {
          trigger: 'item'
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [{
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                'color': '#f3f3f3'
              }
            }, {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'color': '#fdfdfd'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'poi',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'green',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'label',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#999999'
              }
            }]
          }
        },
        series : [
          {
            type: 'lines',
            zlevel: 1,//用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，Canvas分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的zlevel。
            //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。类似于z-index吧
            coordinateSystem: 'bmap',
            effect: {//线特效的配置
              show: true,//是否显示特效。
              period: 6,//特效动画的时间，单位为 s。
              trailLength: 0.7,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
              color: 'yellow',//特效标记的颜色，默认取 lineStyle.color。
              symbol: 'arrow',
              symbolSize: 10//特效标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示高和宽，例如 [20, 10] 表示标记宽为20，高为10。
            },
            lineStyle: {
              normal: {
                color: 'blue',//线的颜色
                type: 'dashed',//线的类型。'solid'，'dashed'，'dotted'
                //opacity: 0.6, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                curveness: 0//边的曲度，支持从 0 到 1 的值，值越大曲度越大。
              }
            },
            data:[
              {fromName: "武汉", toName: "大庆", coords:[[114.31,30.52],[125.03,46.58]]},
              {fromName: "长沙", toName: "湘潭", coords:[[113,28.21],[112.91,27.87]]}
              ] //线数据集。【【起点】，【终点】】
          },
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: this.convertData(data),
            encode: {
              value: 2
            },
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              formatter: '{b}',
              position: 'right'
            },
            itemStyle: {
              color: '#ddb926'
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: this.convertData(data.sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 6)),
            encode: {
              value: 2
            },
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            zlevel: 2
          }
        ]
      }
    }
  },
  watch: {
    setOption: function(){
      this.pathChart.setOption(this.options)
      this.pathChart.resize()
    }
  },
  mounted() {
    this.pathChart = echarts.init(this.$el);
    this.pathChart.setOption(this.options);
    window.onresize = () =>{
      this.pathChart.resize()
    }
  }
}
</script>

<style scoped>

</style>
