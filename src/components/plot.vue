<template>
  <svg width="100%" height="100%"></svg>
</template>

<script>
import raw_data from "../assets/data2.json";
// import raw_data1 from "../assets/data1.json";

import raw_china from "../assets/china-provinces.json";
//import { legend } from "@d3/color-legend";
import * as d3module from "d3";
import * as topojson from "topojson-client";
import * as d3hexbin from "d3-hexbin";

import { mapState } from "vuex";

const d3 = {
  ...d3module,
  ...d3hexbin,
};

let data = JSON.parse(raw_data["2013010100"]);
// let data1 = JSON.parse(raw_data1);

const hexR = 5;
const insideHexR = 3;

let timeoutId = null;

const edges = [
  {
    source: [data[0].lon, data[0].lat],
    target: [data[data.length - 1].lon, data[data.length - 1].lat],
  },
];

let china = raw_china;

let threshold = 3.3,
  offset = 3;

function windOffset(d) {
  const { x, y } = d;
  const U = d3.mean(d, (item) => item.U);
  const V = d3.mean(d, (item) => item.V);
  // const S = Math.sqrt(U * U + V * V);
  let signU = U / Math.abs(U);
  let signV = V / Math.abs(V);
  signU = Math.abs(U) > threshold ? signU : 0;
  signV = Math.abs(V) > threshold ? signV : 0;
  const off = offset;
  return [x + signU * off, y + signV * off];
}

const projection = d3.geoMercator().center([107, 35]).scale(500);
const width = 800,
  height = 600;

let anotherData, hexbin, hex, hexData, scaleColor, scaleSize, color, map;

function refreshSize(val) {
  hex
    .selectAll(".hex")
    .data(hexData)
    .transition()
    .attr("d", (d) => {
      let size =
        val != null ? scaleSize(d3.mean(d, (d) => d[val])) : insideHexR;
      return hexbin.hexagon(size);
    })
    .duration(1000); //过渡动画持续时间 1s;
}

function refreshColor(val) {
  hex
    .selectAll(".hex")
    .data(hexData)
    .transition()
    .attr("fill", (d) => {
      return color(d3.mean(d, (d) => d[val]));
    })
    .duration(1000); //过渡动画持续时间 1s;
}

function run() {
  hex
    .selectAll("path.hex")
    .data(hexData)
    .transition()
    .duration(1000)
    .delay(1000)
    .ease(d3.easeLinear)
    .attr("transform", (d) => {
      const [x, y] = windOffset(d);
      return `translate(${x},${y})`;
    })
    .transition()

    .duration(1000)
    .delay(1000)
    .ease(d3.easeLinear)
    .attr("transform", (d) => `translate(${d.x},${d.y})`);
  timeoutId = setTimeout(run, 5000);
}

export default {
  async mounted() {
    const svg = d3.select("svg").attr("viewBox", [0, 0, width, height]);
    const geoGenerator = d3.geoPath().pointRadius(5).projection(projection);
    anotherData = data.map((d) => {
      const [px, py] = projection([d.lon, d.lat]);
      return Object.assign(d, {
        lon: px,
        lat: py,
      });
    });

    hexbin = d3
      .hexbin()
      .x((d) => d.lon)
      .y((d) => d.lat)
      .radius(hexR);
    hex = svg.append("g");
    hexData = hexbin(anotherData);

    hex
      .selectAll("path.bg")
      .data(hexData)
      .enter()
      .append("path")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("d", () => hexbin.hexagon())
      .attr("class", "bg")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.1)
      .attr("stroke-width", 0.5)
      .attr("fill", "#eee");

    scaleColor = d3
      .scaleLinear()
      .domain([
        d3.quantile(data, 0.1, (d) => d[this.colorChannel]),
        d3.quantile(data, 0.9, (d) => d[this.colorChannel]),
      ])
      .range([0, 1]);

    scaleSize = d3
      .scaleLinear()
      .domain([
        d3.quantile(data, 0.1, (d) => d[this.sizeChannel]),
        d3.quantile(data, 0.95, (d) => d[this.sizeChannel]),
      ])
      .range([1, 4])
      .clamp(true);

    color = (d) => {
      return d3.interpolateRdYlGn(1 - scaleColor(d));
    };

    //主要编码六边形
    hex
      .selectAll("path.hex")
      .data(hexData)
      .enter()
      .append("path")
      .attr("transform", (d) => {
        const [x, y] = windOffset(d);
        return `translate(${x},${y})`;
      })

      .attr("d", () => {
        return hexbin.hexagon(insideHexR);
      })
      .attr("class", "hex")
      .attr("fill", (d) => {
        return color(d3.mean(d, (d) => d[this.colorChannel]));
      })
      .on("click", (e, d) => {
        console.log("click!");
        console.log(d);
      });

    //连线

    run();

    topojson, edges, geoGenerator, china;

    map;
    svg.call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 8])
        .on("zoom", zoomed)
    );
    function zoomed(event) {
      switch (event.sourceEvent.type) {
        case "mousemove":
          hex.attr("transform", event.transform);
          //map.attr("transform", event.transform);
          break;
        case "wheel":
          hex.transition().duration(200).attr("transform", event.transform);
          //map.transition().duration(200).attr("transform", event.transform);

          break;
      }
    }
  },
  data: () => ({
    // colorChannel: configs.colorChannel,
    // sizeChannel: configs.sizeChannel,
    // windChannel: {
    //   threshold: configs.threshold,
    //   offset: configs.offset,
    // },
    // timeStamp: configs.timeStamp,
  }),
  computed: {
    ...mapState(["colorChannel", "sizeChannel", "windChannel", "timeStamp"]),
  },
  watch: {
    colorChannel(val) {
      clearTimeout(timeoutId);
      scaleColor = d3
        .scaleLinear()
        .domain([
          d3.quantile(data, 0.1, (d) => d[val]),
          d3.quantile(data, 0.9, (d) => d[val]),
        ])
        .range([0, 1]);

      color = (d) => {
        return d3.interpolateRdYlGn(1 - scaleColor(d));
      };
      refreshColor(val);
      run();
    },
    sizeChannel(val) {
      clearTimeout(timeoutId);
      scaleSize = d3
        .scaleLinear()
        .domain([
          d3.quantile(data, 0.1, (d) => d[val]),
          d3.quantile(data, 0.9, (d) => d[val]),
        ])
        .range([1, 4])
        .clamp(true);
      refreshSize(val);
      run();
    },
    "windChannel.threshold": function (val) {
      threshold = val;
    },
    "windChannel.offset": function (val) {
      offset = val;
    },
    timeStamp(val) {
      data = JSON.parse(raw_data[val]);
      anotherData = data.map((d) => {
        const [px, py] = projection([d.lon, d.lat]);
        return Object.assign(d, {
          lon: px,
          lat: py,
        });
      });
      hexData = hexbin(anotherData);
      hex
        .selectAll(".hex")
        .data(hexData)
        .transition()
        .attr("fill", (d) => {
          return color(d3.mean(d, (d) => d[this.colorChannel]));
        })
        .attr("d", (d) => {
          let size =
            this.sizeChannel != null
              ? scaleSize(d3.mean(d, (d) => d[this.sizeChannel]))
              : insideHexR;
          return hexbin.hexagon(size);
        })
        .duration(1000); //过渡动画持续时间 1s;
    },
  },
};
</script>
