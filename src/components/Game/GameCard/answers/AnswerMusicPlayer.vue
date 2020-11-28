<template>
  <div v-show="listenStatus" class="mt-3 full-width">
    <v-divider></v-divider>
    <div class="dropdown full-width d-flex flex-column py-2 align-center">
      <transition name="fade" mode="out-in">
        <v-skeleton-loader
          v-if="isLoading"
          class="skeleton"
          type="chip"
          min-width="100%"
        ></v-skeleton-loader>
        <div v-else>
          <iframe
            v-if="trackId"
            scrolling="no"
            frameborder="0"
            allowTransparency="true"
            :src="
              `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=250&height=350&color=ff0000&layout=dark&size=medium&type=tracks&id=${this.trackId}&app_id=1`
            "
            height="65"
            width="300"
          ></iframe>
          <span v-else>Упс... Этого трека нет на Deezer :(</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import API from "../../../../backend-api";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      trackId: null,
      searchEngine: new API(),
      isLoading: false,
      error: null
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
      this.isLoading = true;
      try {
        const response = await this.findTrackId();
        const track = response.data.data.find(el => {
          const responseTrack = el.title_short;
          const answerTrack = this.answers[this.answerIndex].title;
          return (
            responseTrack.toLowerCase().trim() ===
            answerTrack.toLowerCase().replace(/’/, "'")
          );
        });
        this.trackId = track ? track.id : null;
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
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

<style lang="scss" scoped>
.dropdown {
  height: 65px;
}

.skeleton /deep/ {
  height: 100%;

  .v-skeleton-loader__chip {
    width: 100%;
    height: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
