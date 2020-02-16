<template>
  <div>
    <v-card class="d-flex flex-column align-center game-card px-2 py-2">
      <div class="d-flex full-width">
        <span class="mr-auto">{{ name }}</span>
      </div>
      <p class="mt-3">{{ message }}</p>
      <div class="full-width">
        <p>Победитель: {{ winner }}</p>
        <p v-if="result === 'victory' || isRightAnswerSent">
          Правильный ответ: {{ rightAnswer.artist }} - {{ rightAnswer.title }}
        </p>
        <right-answer-form v-else></right-answer-form>
      </div>
      <result-buttons></result-buttons>
      <suggested-answers></suggested-answers>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import GameResultSuggestedAnswers from "./GameResult/GameResultSuggestedAnswers";
import GameResultButtons from "./GameResult/GameResultButtons";
import GameResultRightAnswerForm from "./GameResult/GameResultRightAnswerForm";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["result", "name", "rightAnswer", "isRightAnswerSent"]),
    message() {
      return this.result === "victory"
        ? "Ура, я победил!"
        : "У меня закончились идеи :(";
    },
    winner() {
      return this.result === "victory" ? "Akinator" : this.name;
    }
  },
  components: {
    "suggested-answers": GameResultSuggestedAnswers,
    "result-buttons": GameResultButtons,
    "right-answer-form": GameResultRightAnswerForm
  }
};
</script>
