<template>
  <div v-show="listenStatus" class="mt-3 full-width">
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
</template>

<script>
import API from "../../backend-api";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      trackId: null,
      searchEngine: new API({
        songSearchEngineURL: `https://cors-anywhere.herokuapp.com/https://api.audd.io/findLyrics/`,
        token: "6586db1d822b505cc809c62c9c27febb"
      })
    };
  },
  computed: {
    ...mapGetters(["listenStatus", "answers", "answerIndex"])
  },
  methods: {
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
    }
  },
  mounted() {
    this.setTrackId();
  },
  watch: {
    answerIndex: {
      handler() {
        this.setTrackId();
      }
    }
  }
};
</script>
