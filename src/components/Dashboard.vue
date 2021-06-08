<template>
  <grid-layout :layout.sync="layout" :col-num="12">
    <grid-item
      v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
    >
      <v-card elevation="2" outlined style="height: 100%; width: 100%">
      </v-card>
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import lineChart from "@/components/lineChart";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data: () => ({
    layout: [
      { x: 0, y: 0, w: 9, h: 3, i: "主视图" },
      { x: 9, y: 0, w: 3, h: 3, i: "污染物质" },
      { x: 0, y: 3, w: 9, h: 1, i: "时序预测" },
      { x: 9, y: 3, w: 3, h: 1, i: "传输路径" },
    ],
  }),
};
</script>
