<template>
  <div v-if="answers.length" class="d-flex flex-column full-width">
    <answer-track-name></answer-track-name>
    <answer-buttons></answer-buttons>
  </div>
</template>

<script>
import AnswerTackName from "./answers/AnswerTrackName";
import AnswerButtons from "./answers/AnswerButtons";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["answers"])
  },
  components: {
    "answer-track-name": AnswerTackName,
    "answer-buttons": AnswerButtons
  }
};
</script>
