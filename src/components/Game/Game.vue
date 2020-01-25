<template>
  <v-card class="d-flex flex-column align-center game-card px-2 py-2 mx-10">
    <game-attempt-number></game-attempt-number>

    <game-lyrics-input v-if="!answers.length"></game-lyrics-input>

    <div
      v-if="!answers.length"
      class="d-flex flex-column full-width align-center"
    >
      <v-textarea
        v-if="lyricsInputType === 'keyboard'"
        class="input-width mt-2"
        color="blue-grey"
        label="Строчки из песни"
        :auto-grow="true"
        v-model.trim="$v.lyrics.$model"
        :error-messages="lyricsErrors"
        :success="!$v.lyrics.$invalid"
      ></v-textarea>

      <div
        v-if="lyricsInputType === 'micro'"
        class="full-width d-flex flex-column align-center"
      >
        <div class="d-flex flex-column align-center">
          <span>Выберите язык ввода:</span>
          <v-radio-group class="d-flex flex-column" v-if="!isSpeechLangChosen">
            <v-radio
              v-for="(language, index) in languages"
              @change="changeSpeechLang({ payLoad: language.value })"
              :key="index"
              :label="language.label"
              :value="language.value"
            ></v-radio>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }"
                ><v-btn
                  class="align-self-center"
                  text
                  icon
                  color="green"
                  v-show="speechLang"
                  v-on="on"
                  @click="chooseLanguage()"
                  ><v-icon>mdi-check</v-icon></v-btn
                >
              </template>
              <span>Подтвердить</span>
            </v-tooltip>
          </v-radio-group>
        </div>
        <div
          v-show="this.lyrics"
          class="d-flex flex-column align-center"
          v-if="isSpeechLangChosen"
        >
          <p>Вы напели:</p>
          <p>{{ this.lyrics }}</p>
          <v-btn @click="listenMicro()" color="blue-grey" dark text
            >Напеть еще раз</v-btn
          >
        </div>
      </div>

      <v-btn
        class="mt-2"
        v-show="this.lyrics"
        @click="getAnswers({ lyrics })"
        color="blue-grey"
        :max-width="100"
        dark
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="green"
              :x-large="true"
              v-on="on"
              @click="endGame({ result: 'victory' })"
              ><v-icon>mdi-check</v-icon></v-btn
            >
          </template>
          <span>Верно</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="blue-grey"
              :x-large="true"
              @click="listen = !listen"
              v-on="on"
              ><v-icon>mdi-play</v-icon></v-btn
            >
          </template>
          <span>Прослушать</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              icon
              color="red"
              :x-large="true"
              v-on="on"
              @click="nextAttemt()"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </template>
          <span>Неверно</span>
        </v-tooltip>
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

    <v-dialog v-model="areAnswersEmpty" max-width="620">
      <v-card class="py-3 px-3">
        <p>
          Упс... Я даже представить не могу что это... Может ты напишешь
          поточнее?
        </p>

        <div class="full-width d-flex justify-center align-center">
          <v-btn color="green" @click="areAnswersEmpty = false"
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

import GameLyricsInput from "./GameLyricsInput";
import GameAttemptNumber from "./GameAttemptNumber";

export default {
  data() {
    return {
      lyrics: null,
      listen: false,
      trackId: null,
      answers: [],
      areAnswersEmpty: false,
      isResponseReceived: {
        status: false,
        payLoad: null
      },
      searchEngine: new API({
        songSearchEngineURL: `https://cors-anywhere.herokuapp.com/https://api.audd.io/findLyrics/`,
        token: "6586db1d822b505cc809c62c9c27febb"
      }),
      recognitionEngine: null
    };
  },
  computed: {
    ...mapGetters([
      "name",
      "attemptNumber",
      "isGameOver",
      "lyricsInputType",
      "speechLang",
      "isSpeechLangChosen",
      "languages"
    ]),
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
      "changeAttemptsQuantity",
      "changeSpeechLang",
      "chooseLanguage"
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
      this.isResponseReceived.status = true;
      this.isResponseReceived.payLoad = JSON.parse(JSON.stringify(response));
    },
    listenMicro() {
      this.recognitionEngine.interimResults = true;
      this.recognitionEngine.lang = this.speechLang;
      this.recognitionEngine.addEventListener("result", e => {
        this.lyrics = e.results[0][0].transcript;
      });
      this.recognitionEngine.start();
    }
  },
  mounted() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognitionEngine = new window.SpeechRecognition();
    this.resetSuggestedAnswers();
  },
  destroyed() {
    this.$store.dispatch("resetSpeechLanguage");
    this.$store.dispatch("resetInputType");
  },
  mixins: [validationHelpers, validationMixin],
  watch: {
    isResponseReceived: {
      handler(value) {
        const resultOfRequest = value.payLoad.data.result;
        if (resultOfRequest.length === 0)
          this.areAnswersEmpty = this.answers.length === 0 ? true : false;
      },
      deep: true
    },
    lyricsInputType: {
      handler() {
        this.lyrics = "";
        this.$store.dispatch("resetSpeechLanguage");
        this.recognitionEngine.addEventListener("end", () => {
          if (this.lyricsInputType === "keyboard") this.lyrics = "";
        });
      }
    },
    isSpeechLangChosen: {
      handler() {
        if (this.lyricsInputType === "micro") this.listenMicro();
      }
    }
  },
  components: {
    "game-lyrics-input": GameLyricsInput,
    "game-attempt-number": GameAttemptNumber
  }
};
</script>

<style lang="scss" scoped>
.game-card {
  min-width: 300px;
}
</style>
