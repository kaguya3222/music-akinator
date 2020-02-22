<template>
  <div class="d-flex justify-center align-center full-width">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          icon
          color="blue-grey"
          :x-large="true"
          v-on="on"
          @click="replay()"
          v-show="showButton"
          ><v-icon>mdi-replay</v-icon></v-btn
        >
      </template>
      <span>Играть еще</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          icon
          color="blue-grey"
          :x-large="true"
          v-on="on"
          @click="toggleShowSuggestedAnswers"
          v-show="showButton"
          ><v-icon>mdi-format-list-bulleted</v-icon></v-btn
        >
      </template>
      <span>Список всех треков</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          icon
          color="blue-grey"
          :x-large="true"
          v-on="on"
          @click="exit()"
          v-show="showButton"
          ><v-icon>mdi-exit-to-app</v-icon></v-btn
        >
      </template>
      <span>Закончить игру</span>
    </v-tooltip>
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
