import answerButtonOptions from "./answersButtonsOptions";

export default {
  state: {
    answers: [],
    answerIndex: null,
    areAnswersReceived: null
  },
  getters: {
    answers(state) {
      return state.answers;
    },
    answerIndex(state) {
      return state.answerIndex;
    },
    areAnswersEmpty(state) {
      return state.answers.length === 0;
    },
    areAnswersReceived(state) {
      return state.areAnswersReceived;
    }
  },
  mutations: {
    mutateAnswers(state, { payLoad }) {
      state.answers = payLoad;
      state.answers.splice(0, 0);
    },
    mutateAnswerIndex(state, { payLoad }) {
      state.answerIndex = payLoad;
    },
    mutateAnswersReceivedStatus(state, { payLoad }) {
      state.areAnswersReceived = payLoad;
    }
  },
  actions: {
    setAnswers(store, { payLoad }) {
      store.commit("mutateAnswers", { payLoad: payLoad });
    },
    changeAnswerIndex(store, { payLoad }) {
      store.commit("mutateAnswerIndex", { payLoad });
    },
    changeAnswersReceivedStatus(store, { payLoad }) {
      store.commit("mutateAnswersReceivedStatus", { payLoad });
    }
  },
  modules: {
    answerButtonOptions
  }
};
