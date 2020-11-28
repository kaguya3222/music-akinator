<template>
  <v-card class="d-flex flex-column align-center game-card px-3 py-3 mx-10">
    <game-attempt-number></game-attempt-number>
    <game-lyrics-input></game-lyrics-input>
    <game-answer></game-answer>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import GameLyricsInput from "./lyrics-input/GameCardLyricsInput";
import GameAttemptNumber from "./GameCardAttemptNumber";
import GameAnswer from "./answers/GameCardAnswer";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["attemptNumber", "answers", "answerIndex"])
  },
  methods: {
    ...mapActions(["changeAnswerIndex", "resetSuggestedAnswers"])
  },
  beforeMount() {
    this.$store.dispatch("setAnswers", { payLoad: [] });
    this.$store.dispatch("changeIsRightAnswerSent", { payLoad: false });
    this.changeAnswerIndex({ payLoad: this.attemptNumber - 1 });
    this.resetSuggestedAnswers();
  },
  watch: {
    attemptNumber() {
      this.changeAnswerIndex({ payLoad: this.attemptNumber - 1 });
    }
  },
  components: {
    "game-lyrics-input": GameLyricsInput,
    "game-attempt-number": GameAttemptNumber,
    "game-answer": GameAnswer
  }
};
</script>

<style lang="scss" scoped>
.game-card {
  min-width: 300px;
}
</style>
