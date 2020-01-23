import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import game from "./modules/game";
import lyricsInput from "./modules/lyricsInput";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    game,
    lyricsInput
  }
});
