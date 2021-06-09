<template>
  <grid-layout :layout.sync="layout" :col-num="12" @layout-ready="allReady">
    <grid-item
      :x="layout[0].x"
      :y="layout[0].y"
      :w="layout[0].w"
      :h="layout[0].h"
      :i="layout[0].i"
      :key="layout[0].i"
      :isDraggable="false"
    >
      <v-card color="#f3f3f3" elevation="2" outlined style="height: 100%; width: 100%">
        <plot ref="plot" />
      </v-card>
    </grid-item>
    <grid-item
        :x="layout[1].x"
        :y="layout[1].y"
        :w="layout[1].w"
        :h="layout[1].h"
        :i="layout[1].i"
        :key="layout[1].i"
        :isDraggable="false"
    >
      <v-card elevation="2" outlined style="height: 100%; width: 100%">
        <trans-path ref="transPath" />
      </v-card>
    </grid-item>
    <grid-item
        :x="layout[2].x"
        :y="layout[2].y"
        :w="layout[2].w"
        :h="layout[2].h"
        :i="layout[2].i"
        :key="layout[2].i"
    >
      <v-card elevation="2" outlined style="height: 100%; width: 100%">
        <line-chart ref="lineChart"/>
      </v-card>
    </grid-item>
    <grid-item
        :x="layout[3].x"
        :y="layout[3].y"
        :w="layout[3].w"
        :h="layout[3].h"
        :i="layout[3].i"
        :key="layout[3].i"
    >
      <v-card elevation="2" outlined style="height: 100%; width: 100%">
        <radar-chart ref="radarChart" />
      </v-card>
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import lineChart from "@/components/lineChart";
import transPath from "@/components/transPath";
import radarChart from "@/components/radarChart";
import plot from "@/components/plot";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    lineChart,
    transPath,
    radarChart,
    plot
  },
  data: () => ({
    layout: [
      { x: 0, y: 0, w: 6, h: 3, i: "主视图" },
      { x: 6, y: 0, w: 6, h: 3, i: "污染物质" },
      { x: 0, y: 3, w: 9, h: 1.5, i: "时序预测" },
      { x: 9, y: 3, w: 3, h: 1.5, i: "传输路径" },
    ],
  }),
  methods:{
    allReady: function(){
      this.$refs.lineChart.lineChart.resize();
      this.$refs.transPath.pathChart.resize();
      this.$refs.radarChart.radarChart.resize();
    }
  }
};
</script>
