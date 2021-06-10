import Vue from 'vue'
import Vuex from 'vuex'

import default_setting from "../configs/defaults";

import _ from "lodash";
Vue.use(Vuex)

const config = _.cloneDeep(default_setting);

export default new Vuex.Store({
  state: {
    ...config,
    selectedStation: [],
  },
  mutations: {
    setTimestamp(state, val) {
      state.timeStamp = val;
    },
    setColorChannel(state, val) {
      if (val === "无") {
        state.colorChannel = null;
      }
      else {
        state.colorChannel = val;
      }
    },
    setSizeChannel(state, val) {
      if (val === "无") {
        state.sizeChannel = null;
      }
      else {
        state.sizeChannel = val;
      }
    },
    showWind(state, val) {
      if (val) {
        console.log(default_setting);
        state.windChannel.offset = default_setting.windChannel.offset;
      }
      else {
        state.windChannel.offset = 0;
      }
    },
    selectStation(state, stations) {
      console.log(stations)
      state.selectedStation = _.cloneDeep(stations);
    },
    station(state, station){
      console.log(station)
      state.station = station
    }

  },
  actions: {
  },
  modules: {
  }
})
