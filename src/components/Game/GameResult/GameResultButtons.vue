<template>
  <div class="d-flex justify-center align-center full-width">
    <v-btn
      text
      icon
      color="blue-grey"
      :x-large="true"
      @click="replay()"
      v-show="showButton"
      ><v-icon>mdi-replay</v-icon></v-btn
    >
    <v-btn
      text
      icon
      color="blue-grey"
      :x-large="true"
      @click="toggleShowSuggestedAnswers"
      v-show="showButton"
      ><v-icon>mdi-format-list-bulleted</v-icon></v-btn
    >
    <v-btn
      text
      icon
      color="blue-grey"
      :x-large="true"
      @click="exit()"
      v-show="showButton"
      ><v-icon>mdi-exit-to-app</v-icon></v-btn
    >
  </div>
</template>

<script lang="js">
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "result",
      "showSuggestedAnswers",
      "isRightAnswerSent",
      "isFormSubmitButtonDisabled"]
    ),
    showButton() {
      return (!this.isFormSubmitButtonDisabled && this.isRightAnswerSent) ||
              this.result === 'victory';
    }
  },
  methods: {
    replay() {
      this.$store.dispatch("changeStep", { payLoad: 2 });
    },
    exit() {
      this.$store.dispatch("increaseStep");
    },
    toggleShowSuggestedAnswers() {
      this.$store.dispatch("changeShowSuggestedAnswers",
              { payLoad: !this.showSuggestedAnswers });
    }
  }
}
</script>
