export default {
  state: {
    showSuggestedAnswers: false,
    isRightAnswerSent: false,
    isFormSubmitButtonDisabled: true
  },
  getters: {
    showSuggestedAnswers(state) {
      return state.showSuggestedAnswers;
    },
    isRightAnswerSent(state) {
      return state.isRightAnswerSent;
    },
    isFormSubmitButtonDisabled(state) {
      return state.isFormSubmitButtonDisabled;
    }
  },
  mutations: {
    mutateShowSuggestedAnswers(state, { payLoad }) {
      state.showSuggestedAnswers = payLoad;
    },
    mutateIsRightAnswerSent(state, { payLoad }) {
      state.isRightAnswerSent = payLoad;
    },
    mutateIsFormSubmitButtonDisabled(state, { payLoad }) {
      state.isFormSubmitButtonDisabled = payLoad;
    }
  },
  actions: {
    changeShowSuggestedAnswers(store, { payLoad }) {
      store.commit("mutateShowSuggestedAnswers", { payLoad });
    },
    changeIsRightAnswerSent(store, { payLoad }) {
      store.commit("mutateIsRightAnswerSent", { payLoad });
    },
    changeIsFormSubmitButtonDisabled(store, { payLoad }) {
      store.commit("mutateIsFormSubmitButtonDisabled", { payLoad });
    }
  }
};
