export default {
  state: {
    step: 1,
    name: null
  },
  getters: {
    step(state) {
      return state.step;
    },
    name(state) {
      return state.name;
    }
  },
  mutations: {
    mutateStep(state) {
      state.step += 1;
    },
    mutateName(state, { payLoad }) {
      state.name = payLoad;
    }
  },
  actions: {
    increaseStep(store) {
      store.commit("mutateStep");
    },
    changeName(store, { payLoad }) {
      store.commit("mutateName", { payLoad });
    }
  }
};
