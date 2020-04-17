import lyricsInput from "./lyricsOptions";

export default {
  state: {
    lyrics: null
  },
  getters: {
    lyrics(state) {
      return state.lyrics;
    }
  },
  mutations: {
    mutateLyrics(state, { payLoad }) {
      state.lyrics = payLoad;
    }
  },
  actions: {
    setLyrics(store, { payLoad }) {
      store.commit("mutateLyrics", { payLoad });
    }
  },
  modules: {
    lyricsInput
  }
};
