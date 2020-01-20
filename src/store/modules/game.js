export default {
  state: {
    result: null,
    attemptNumber: 1
  },
  getters: {
    result(state) {
      return state.result;
    },
    attemptNumber(state) {
      return state.attemptNumber;
    },
    isGameOver(state) {
      return state.attemptNumber > 5;
    }
  },
  mutations: {
    mutateResult(state, { payLoad }) {
      state.result = payLoad;
    },
    mutateAttemptNumber(state) {
      state.result += 1;
    }
  },
  actions: {
    changeResult(store, { payLoad }) {
      store.commit("mutateResult", { payLoad });
    },
    increaseAttemptNumber(store) {
      store.commit("mutateAttemptNumber");
    }
  }
};
