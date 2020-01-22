<template>
  <v-card class="d-flex flex-column align-center game-card px-2 py-2">
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
        v-model.trim="lyrics"
      ></v-textarea>
      <v-btn
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
              width="350"
              height="65"
            ></iframe>
            <span v-if="!trackId">Упс... Этого трека нет на Deezer :(</span>
          </div>
        </div>
      </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import API from "../../backend-api";
export default {
  data() {
    return {
      lyrics: null,
      listen: false,
      trackId: null,
      answers: [],
      searchEngine: new API({
        songSearchEngineURL: `https://cors-anywhere.herokuapp.com/https://api.audd.io/findLyrics/`,
        token: "3761f8927138dfaeffedf249d2d8b590"
      })
    };
  },
  computed: {
    ...mapGetters(["name", "attemptNumber", "isGameOver"]),
    answerIndex() {
      return this.attemptNumber - 1;
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
      if (response.data.result.length === 0) {
        console.log("error");
        return true;
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
      console.log(this.answers);
      if (this.answers.length < 5)
        this.changeAttemptsQuantity({ payLoad: this.answers.length });
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
    }
  },
  mounted() {
    this.resetSuggestedAnswers();
  }
};
</script>

<style lang="scss" scoped>
.game-card {
  min-width: 300px;
}
</style>
