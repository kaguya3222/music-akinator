export default {
  state: {
    languages: [
      {
        value: "en-us",
        label: "Английский"
      },
      {
        value: "ru",
        label: "Русский"
      }
    ],
    lyricsInput: {
      speechLang: {
        isChosen: false,
        value: null
      },
      type: null
    }
  },
  getters: {
    languages(state) {
      return state.languages;
    },
    lyricsInputType(state) {
      return state.lyricsInput.type;
    },
    speechLang(state) {
      return state.lyricsInput.speechLang.value;
    },
    isSpeechLangChosen(state) {
      return state.lyricsInput.speechLang.isChosen;
    }
  },
  mutations: {
    mutateLyricsInputType(state, { payLoad }) {
      state.lyricsInput.type = payLoad;
    },
    mutateSpeechLang(state, { payLoad }) {
      state.lyricsInput.speechLang.value = payLoad;
    },
    mutateSpeechLangChosenStatus(state, { payLoad }) {
      state.lyricsInput.speechLang.isChosen = payLoad;
    }
  },
  actions: {
    changeLyricsInputType(store, { payLoad }) {
      store.commit("mutateLyricsInputType", { payLoad });
    },
    changeSpeechLang(store, { payLoad }) {
      store.commit("mutateSpeechLang", { payLoad });
    },
    chooseLanguage(store) {
      store.commit("mutateSpeechLangChosenStatus", { payLoad: true });
    },
    resetSpeechLanguage(store) {
      store.commit("mutateSpeechLang", { payLoad: null });
      store.commit("mutateSpeechLangChosenStatus", { payLoad: false });
    },
    resetInputType(store) {
      store.commit("mutateLyricsInputType", { payLoad: null });
    }
  }
};
