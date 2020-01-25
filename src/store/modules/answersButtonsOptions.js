export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    endGame: (store, { payLoad }) => {
      const answers = store.getters.answers;
      const answerIndex = store.getters.answerIndex;
      const result = payLoad.find(el => {
        return el === "victory" || el === "defeat";
      });
      if (result === "victory") {
        store.dispatch("changeSuggestedAnswers", {
          payLoad: answers[answerIndex]
        });
        store.dispatch("setRightAnswer", {
          payLoad: {
            artist: answers[answerIndex].artist,
            title: answers[answerIndex].title
          }
        });
      } else {
        store.dispatch("increasePoints");
      }
      store.dispatch("changeResult", { payLoad: result });
      store.dispatch("increaseStep");
      store.dispatch("resetAttemptNumber");
    },
    nextAttempt(store) {
      store.dispatch("changeSuggestedAnswers", {
        payLoad: store.getters.answers[store.getters.answerIndex]
      });
      store.dispatch("increaseAttemptNumber");
      if (store.getters.isGameOver)
        store.dispatch("endGame", { payLoad: ["defeat"] });
    }
  }
};
