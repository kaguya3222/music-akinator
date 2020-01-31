<template>
  <div class="d-flex justify-center mt-1 mb-1">
    <v-btn
      v-show="this.lyrics"
      @click="getAnswers({ lyrics })"
      color="blue-grey"
      :max-width="100"
      dark
      >Загадать</v-btn
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import API from "../../../backend-api";

import parsingHelpers from "../../../mixins/parsingHelpers";

export default {
  data() {
    return {
      searchEngine: new API()
    };
  },
  computed: {
    ...mapGetters(["lyrics", "answers", "attemptNumber"])
  },
  methods: {
    ...mapActions(["setAnswers", "changeAnswersReceivedStatus"]),
    async getAnswers({ lyrics }) {
      this.changeAnswersReceivedStatus({ payLoad: false });
      lyrics = this.removeLinebreaks({ str: lyrics });
      const response = await this.searchEngine.findSongByLyrics({ lyrics });
      this.changeAnswersReceivedStatus({ payLoad: true });
      if (response.data.result.length === 0) {
        return true;
      }
      this.setAnswers({
        payLoad: this.removeDuplicates({
          array: this.handleAnswers({ answers: response })
        })
      });
      this.setAttemptsQuantity();
    },
    handleAnswers({ answers }) {
      return answers.data.result.map(el => {
        el.title = this.parseRussianTitle({ title: el.title }).trim();
        return {
          artist: el.artist,
          title: el.title
        };
      });
    },
    setAttemptsQuantity() {
      if (this.answers.length < 5)
        this.$store.dispatch("changeAttemptsQuantity", {
          payLoad: this.answers.length
        });
    }
  },
  mixins: [parsingHelpers]
};
</script>
