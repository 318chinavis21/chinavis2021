<template>
  <svg width="100%" height="100%"></svg>
</template>

<script>
import raw_data from "../assets/data2.json";
// import raw_data1 from "../assets/data1.json";

import raw_china from "../assets/china-provinces.json";
import legend from "d3-svg-legend";
import * as d3module from "d3";
import * as topojson from "topojson-client";
import * as d3hexbin from "d3-hexbin";
import aqi from "../utils/aqi";

import { mapState } from "vuex";

// const polluant_color = {
//   "PM2.5": "#f44336",
//   PM10: "#e91e63",
//   O3: "#2196f3",
//   NO2: "#ff9800",
//   SO2: "#795548",
// };

const d3 = {
  ...d3module,
  ...d3hexbin,
  ...legend,
};

// const polluant_color = {
//   "PM2.5": d3.schemeSet2[0],
//   PM10: d3.schemeSet2[1],
//   O3: d3.schemeSet2[2],
//   NO2: d3.schemeSet2[3],
//   SO2: d3.schemeSet2[4],
//   CO: d3.schemeSet2[5],
// };

const polluant_color = d3
  .scaleOrdinal()
  .domain(["PM2.5", "PM10", "O3", "NO2", "SO2", "CO"])
  .range(d3.schemeDark2);

let data = prepareData("2013010100");
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

function prepareData(timeStamp) {
  let data = JSON.parse(raw_data[timeStamp]);
  for (let record of data) {
    let t = [
      ["PM2.5", record["PM2.5"]],
      ["PM10", record["PM10"]],
      ["O3", record["O3"]],
      ["NO2", record["NO2"]],
      ["SO2", record["SO2"]],
      ["CO", record["CO"]],
    ];
    record.AQI = aqi.aqi(t);
    record.most_polluant = aqi.most_polluant(t);
  }
  return data;
}

const projection = d3.geoMercator().center([107, 35]).scale(500);
const width = 800,
  height = 600;
let svg;

let anotherData, hexbin, hex, hexData, scaleColor, scaleSize, color, map;

let polluant_legend, color_legend;

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
      if (val == "most_polluant") {
        const p = _(d)
          .countBy((x) => x[val])
          .toPairs()
          .maxBy((x) => x[1])[0];
        return polluant_color(p);
      } else {
        return color(d3.mean(d, (d) => d[val]));
      }
    })
    .duration(1000); //过渡动画持续时间 1s;
}

function setLegend(channel) {
  polluant_legend = d3
    .legendColor()
    .shapeWidth(30)
    .shapePadding(10)
    .labelOffset(25)
    .scale(polluant_color);

  color_legend = d3
    .legendColor()
    .shapeWidth(30)
    .cells(10)
    .orient("horizontal")
    .scale(color);
  if (channel == "most_polluant") {
    svg.select(".legendOrdinal").call(polluant_legend);
  } else {
    svg.select(".legendOrdinal").call(color_legend);
  }
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
    svg = d3.select("svg").attr("viewBox", [0, 0, width, height]);
    const geoGenerator = d3.geoPath().pointRadius(5).projection(projection);
    anotherData = data.map((d) => {
      const [px, py] = projection([d.lon, d.lat]);
      return Object.assign(d, {
        x: px,
        y: py,
      });
    });

    hexbin = d3
      .hexbin()
      .x((d) => d.x)
      .y((d) => d.y)
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
      .scaleSequential((t) => d3.interpolateRdYlGn(1 - t))
      .domain([
        d3.quantile(data, 0.1, (d) => d[this.colorChannel]),
        d3.quantile(data, 0.9, (d) => d[this.colorChannel]),
      ])
      .clamp(true);

    scaleSize = d3
      .scaleLinear()
      .domain([
        d3.quantile(data, 0.1, (d) => d[this.sizeChannel]),
        d3.quantile(data, 0.95, (d) => d[this.sizeChannel]),
      ])
      .range([1, 4])
      .clamp(true);

    // color = (d) => {
    //   return d3.interpolateRdYlGn(1 - scaleColor(d));
    // };

    color = scaleColor;

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
        this.$store.commit("selectStation", d);
      });

    //图例
    svg
      .append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(20,20)");

    polluant_legend = d3
      .legendColor()
      .shapeWidth(30)
      .shapePadding(10)
      .scale(polluant_color);

    color_legend = d3
      .legendColor()
      .shapeWidth(30)
      .cells(10)
      .orient("horizontal")
      .scale(color);

    // svg.select(".legendOrdinal").call(legendOrdinal);
    setLegend(this.colorChannel);
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
  data: () => ({}),
  computed: {
    ...mapState(["colorChannel", "sizeChannel", "windChannel", "timeStamp"]),
  },
  watch: {
    colorChannel(val) {
      clearTimeout(timeoutId);
      color = scaleColor = d3
        .scaleSequential((t) => d3.interpolateRdYlGn(1 - t))
        .domain([
          d3.quantile(data, 0.1, (d) => d[val]),
          d3.quantile(data, 0.9, (d) => d[val]),
        ])
        .clamp(true);
      refreshColor(val);
      setLegend(val);
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
      data = prepareData(val);
      anotherData = data.map((d) => {
        const [px, py] = projection([d.lon, d.lat]);
        return Object.assign(d, {
          x: px,
          y: py,
        });
      });
      hexData = hexbin(anotherData);
      hex
        .selectAll(".hex")
        .data(hexData)
        .transition()
        .attr("fill", (d) => {
          if (this.colorChannel == "most_polluant") {
            const p = _(d)
              .countBy((x) => x[this.colorChannel])
              .toPairs()
              .maxBy((x) => x[1])[0];
            return polluant_color(p);
          } else {
            return color(d3.mean(d, (d) => d[this.colorChannel]));
          }
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
