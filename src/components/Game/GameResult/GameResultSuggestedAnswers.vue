<template>
  <v-expand-transition>
    <div v-if="showSuggestedAnswers">
      <v-divider></v-divider>
      <div class="full-width d-flex flex-column">
        <v-subheader class="align-self-center"
          >Песни, которые я предлагал как ответ:
        </v-subheader>
        <v-list-item v-for="(answer, index) in suggestedAnswers" :key="index">
          <suggested-answer :answer="answer" :index="index"></suggested-answer>
        </v-list-item>
      </div>
    </div>
  </v-expand-transition>
</template>

<script lang="js">
import { mapGetters } from "vuex";
import suggestedAnswer from "./GameResultSuggestedAnswer";

export default {
  computed: {
    ...mapGetters(["suggestedAnswers", "showSuggestedAnswers"])
  },
  components: {
    "suggested-answer": suggestedAnswer
  }
};
</script>
