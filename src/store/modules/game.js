export default {
  state: {
    result: null,
    attemptNumber: 1,
    attemptsQuantity: 5,
    rightAnswer: null,
    points: 0,
    suggestedAnswers: []
  },
  getters: {
    result(state) {
      return state.result;
    },
    attemptNumber(state) {
      return state.attemptNumber;
    },
    isGameOver(state) {
      return state.attemptNumber > state.attemptsQuantity;
    },
    attemptsQuantity(state) {
      return state.attemptsQuantity;
    },
    rightAnswer(state) {
      return state.rightAnswer;
    },
    points(state) {
      return state.points;
    },
    suggestedAnswers(state) {
      return state.suggestedAnswers;
    }
  },
  mutations: {
    mutateResult(state, { payLoad }) {
      state.result = payLoad;
    },
    mutateAttemptNumber(state, { payLoad }) {
      state.attemptNumber = payLoad;
    },
    mutateAttemptsQuantity(state, { payLoad }) {
      state.attemptsQuantity = payLoad;
    },
    mutateRightAnswer(state, { payLoad }) {
      state.rightAnswer = payLoad;
    },
    mutatePoints(state, { payLoad }) {
      state.points = payLoad;
    },
    mutateSuggestedAnswers(state, { payLoad }) {
      state.suggestedAnswers = payLoad;
    }
  },
  actions: {
    changeResult(store, { payLoad }) {
      store.commit("mutateResult", { payLoad });
    },
    increaseAttemptNumber(store) {
      const payLoad = store.state.attemptNumber + 1;
      store.commit("mutateAttemptNumber", { payLoad });
    },
    resetAttemptNumber(store) {
      store.commit("mutateAttemptNumber", { payLoad: 1 });
    },
    changeAttemptsQuantity(store, { payLoad }) {
      store.commit("mutateAttemptsQuantity", { payLoad });
    },
    setRightAnswer(store, { payLoad }) {
      store.commit("mutateRightAnswer", { payLoad });
    },
    increasePoints(store) {
      const payLoad = store.state.points + 1;
      store.commit("mutatePoints", { payLoad });
    },
    changePoints(store, { payLoad }) {
      store.commit("mutatePoints", { payLoad });
    },
    changeSuggestedAnswers(store, { payLoad }) {
      const answers = JSON.parse(JSON.stringify(store.state.suggestedAnswers));
      answers.push(payLoad);
      store.commit("mutateSuggestedAnswers", { payLoad: answers });
    },
    resetSuggestedAnswers(store) {
      store.commit("mutateSuggestedAnswers", { payLoad: [] });
    }
  }
};
