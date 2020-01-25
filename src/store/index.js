import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import game from "./modules/game";
import answers from "./modules/answers";
import lyrics from "./modules/lyrics/lyrics";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    game,
    answers,
    lyrics
  }
});
