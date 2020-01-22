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
    mutateStep(state, { payLoad }) {
      state.step = payLoad;
    },
    mutateName(state, { payLoad }) {
      state.name = payLoad;
    }
  },
  actions: {
    increaseStep(store) {
      const payLoad = store.state.step + 1;
      store.commit("mutateStep", { payLoad });
    },
    changeName(store, { payLoad }) {
      store.commit("mutateName", { payLoad });
    },
    changeStep(store, { payLoad }) {
      store.commit("mutateStep", { payLoad });
    }
  }
};
