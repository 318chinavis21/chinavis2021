<template>
  <div class="about">
    <lineChart />
    <radarChart />
    <transPath />
  </div>
</template>

<script>
import lineChart from "@/components/lineChart";
import transPath from "@/components/transPath";
import radarChart from "@/components/radarChart";

export default {
  name: "About",

  components: {
    lineChart,
    transPath,
    radarChart
  },
};
</script>
