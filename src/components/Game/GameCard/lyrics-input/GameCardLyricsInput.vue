<template>
  <div class="mt-2" :key="lyricsInputType" v-if="!answers.length">
    <lyrics-input-options></lyrics-input-options>
    <lyrics-text-field-input></lyrics-text-field-input>
    <lyrics-microphone-input></lyrics-microphone-input>
    <lyrics-get-answers-button></lyrics-get-answers-button>
    <lyrics-not-found-warning></lyrics-not-found-warning>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LyricsInputOptions from "./LyricsInputOptions";
import LyricsTextFieldInput from "./LyricsTextFieldInput";
import LyricsMicrophoneInput from "./microphoneInput/LyricsMicrophoneInput";
import LyricsGetAnswersButton from "./LyricsGetAnswersButton";
import LyricsNotFoundWarning from "./LyricsNotFoundWarning";

export default {
  computed: {
    ...mapGetters(["lyricsInputType", "answers"])
  },
  components: {
    "lyrics-text-field-input": LyricsTextFieldInput,
    "lyrics-microphone-input": LyricsMicrophoneInput,
    "lyrics-get-answers-button": LyricsGetAnswersButton,
    "lyrics-input-options": LyricsInputOptions,
    "lyrics-not-found-warning": LyricsNotFoundWarning
  },
  updated() {
    this.$store.dispatch("resetSpeechLanguage");
    this.$store.dispatch("setLyrics", { payLoad: null });
  }
};
</script>
