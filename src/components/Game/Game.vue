<template>
  <v-card class="d-flex flex-column align-center game-card px-2 py-2 mx-10">
    <div class="d-flex full-width">
      <span>{{ name }}</span>
      <span class="ml-auto">Попытка {{ attemptNumber }}</span>
    </div>

    <div
      v-if="!answers.length"
      class="d-flex flex-column full-width align-center"
    >
      <v-textarea
        class="input-width mt-2"
        color="blue-grey"
        label="Строчки из песни"
        :auto-grow="true"
        v-model.trim="$v.lyrics.$model"
        :error-messages="lyricsErrors"
        :success="!$v.lyrics.$invalid"
      ></v-textarea>
      <v-btn
        class="mt-2"
        @click="getAnswers({ lyrics })"
        color="blue-grey"
        :max-width="100"
        :dark="!isDisabled"
        :disabled="isDisabled"
        >Загадать</v-btn
      >
    </div>

    <div v-if="answers.length" class="d-flex flex-column full-width">
      <span class="my-1">Да это же...</span>
      <span
        >{{ answers[answerIndex].artist }} -
        {{ answers[answerIndex].title }}</span
      >
      <div class="full-width d-flex justify-center">
        <v-btn
          text
          icon
          color="green"
          :x-large="true"
          @click="endGame({ result: 'victory' })"
          ><v-icon>mdi-check</v-icon></v-btn
        >
        <v-btn
          text
          icon
          @click="listen = !listen"
          color="blue-grey"
          :x-large="true"
          ><v-icon>mdi-play</v-icon></v-btn
        >
        <v-btn text icon color="red" :x-large="true" @click="nextAttemt()"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </div>
      <v-expand-transition>
        <div v-show="listen" class="mt-3">
          <v-divider></v-divider>
          <div class="full-width d-flex flex-column px-3 py-3">
            <iframe
              v-if="trackId"
              scrolling="no"
              frameborder="0"
              allowTransparency="true"
              :src="
                `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=250&height=350&color=ff0000&layout=dark&size=medium&type=tracks&id=${this.trackId}&app_id=1`
              "
              height="65"
              width="250"
            ></iframe>
            <span v-if="!trackId">Упс... Этого трека нет на Deezer :(</span>
          </div>
        </div>
      </v-expand-transition>
    </div>

    <v-dialog v-model="isAnswersEmpty" max-width="620">
      <v-card class="py-3 px-3">
        <p>
          Упс... Я даже представить не могу что это... Может ты напишешь
          поточнее?
        </p>

        <div class="full-width d-flex justify-center align-center">
          <v-btn color="green" @click="isAnswersEmpty = false"
            >Я попробую</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import API from "../../backend-api";
import validationHelpers from "../../mixins/validationHelpers";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      lyrics: null,
      listen: false,
      trackId: null,
      answers: [],
      isAnswersEmpty: false,
      isReceived: {
        status: false,
        payLoad: null
      },
      searchEngine: new API({
        songSearchEngineURL: `https://cors-anywhere.herokuapp.com/https://api.audd.io/findLyrics/`,
        token: "6586db1d822b505cc809c62c9c27febb"
      })
    };
  },
  computed: {
    ...mapGetters(["name", "attemptNumber", "isGameOver"]),
    answerIndex() {
      return this.attemptNumber - 1;
    },
    lyricsErrors() {
      let errors = [];
      if (!this.$v.lyrics.$dirty) return errors;
      errors = this.checkIfErrorShouldAppend({
        field: this.$v.lyrics,
        errors,
        errorMessage: "Это поле обязательно!",
        errorType: "required"
      });
      return errors;
    },
    isDisabled() {
      return this.$v.$invalid;
    }
  },
  validations: {
    lyrics: {
      required
    }
  },
  methods: {
    ...mapActions([
      "changeResult",
      "increaseStep",
      "increaseAttemptNumber",
      "resetAttemptNumber",
      "setRightAnswer",
      "changeSuggestedAnswers",
      "resetSuggestedAnswers",
      "increasePoints",
      "changeAttemptsQuantity"
    ]),
    async getAnswers({ lyrics }) {
      lyrics = this.removeLinebreaks({ str: lyrics });
      const response = await this.searchEngine.findSongByLyrics({ lyrics });
      this.receive({ response });
      if (response.data.result.length === 0) {
        return false;
      }
      this.setAnswers({ response });
      this.setTrackId();
    },
    async findTrackId() {
      return await this.searchEngine.findTrackId({
        artist: this.answers[this.answerIndex].artist,
        title: this.answers[this.answerIndex].title
      });
    },
    async setTrackId() {
      const response = await this.findTrackId();
      const track = response.data.data.find(el => {
        return (
          el.title_short.toLowerCase().trim() ===
          this.answers[this.answerIndex].title.toLowerCase()
        );
      });
      this.trackId = track ? track.id : null;
    },
    setAnswers({ response }) {
      response.data.result.map(el => {
        el.title = this.parseRussianTitle({ title: el.title }).trim();
        this.answers.push({
          artist: el.artist,
          title: el.title
        });
      });
      this.answers = this.removeDuplicates({ array: this.answers });
      this.setAttemptsQuantity();
    },
    removeLinebreaks({ str }) {
      return str.replace(/[\r\n]+/gm, " ");
    },
    parseRussianTitle({ title }) {
      if (title.indexOf("(") >= 0) {
        return title.slice(0, -(title.length - title.indexOf("(")));
      }
      return title;
    },
    nextAttemt() {
      this.changeSuggestedAnswers({ payLoad: this.answers[this.answerIndex] });
      this.increaseAttemptNumber();
      this.isGameOver ? this.endGame({ result: "defeat" }) : this.setTrackId();
    },
    endGame({ result }) {
      if (result === "victory") {
        this.changeSuggestedAnswers({
          payLoad: this.answers[this.answerIndex]
        });
        this.setRightAnswer({
          payLoad: {
            artist: this.answers[this.answerIndex].artist,
            title: this.answers[this.answerIndex].title
          }
        });
      } else {
        this.increasePoints();
      }
      this.changeResult({ payLoad: result });
      this.increaseStep();
      this.resetAttemptNumber();
    },
    removeDuplicates({ array }) {
      return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
    },
    setAttemptsQuantity() {
      if (this.answers.length < 5)
        this.changeAttemptsQuantity({ payLoad: this.answers.length });
    },
    receive({ response }) {
      this.isReceived.status = true;
      this.isReceived.payLoad = JSON.parse(JSON.stringify(response));
    }
  },
  mounted() {
    this.resetSuggestedAnswers();
  },
  mixins: [validationHelpers, validationMixin],
  watch: {
    isReceived: {
      handler(value) {
        const resultOfRequest = value.payLoad.data.result;
        if (resultOfRequest.length === 0)
          this.isAnswersEmpty = this.answers.length === 0 ? true : false;
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.game-card {
  min-width: 300px;
}
</style>
