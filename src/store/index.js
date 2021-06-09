import Vue from 'vue'
import Vuex from 'vuex'

import default_setting from "../configs/defaults";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...default_setting,
    selectedStation: null,
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
        state.windChannel = default_setting.windChannel;
      }
      else {
        state.windChannel.offset = 0;
      }
    }

  },
  actions: {
  },
  modules: {
  }
})
