<template>
  <div v-if="answers.length" class="d-flex flex-column full-width">
    <answer-track-name></answer-track-name>
    <answer-buttons></answer-buttons>
    <v-expand-transition>
      <answer-music-player></answer-music-player>
    </v-expand-transition>
  </div>
</template>

<script>
import AnswerTackName from "./AnswerTrackName";
import AnswerButtons from "./AnswerButtons";
import AnswerMusicPlayer from "./AnswerMusicPlayer";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["answers"])
  },
  components: {
    "answer-track-name": AnswerTackName,
    "answer-buttons": AnswerButtons,
    "answer-music-player": AnswerMusicPlayer
  }
};
</script>
