export default {
  state: {
    listenStatus: null
  },
  getters: {
    listenStatus(state) {
      return state.listenStatus;
    }
  },
  mutations: {
    mutateListenStatus(state, { payLoad }) {
      state.listenStatus = payLoad;
    }
  },
  actions: {
    changeListenStatus(store) {
      store.commit("mutateListenStatus", {
        payLoad: !store.getters.listenStatus
      });
    }
  }
};
