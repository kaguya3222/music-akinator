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
    mutateAttemptNumber(state, { payLoad }) {
      state.attemptNumber = payLoad;
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
    }
  }
};
