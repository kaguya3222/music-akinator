<template>
  <div
    v-if="lyricsInputType === 'micro'"
    class="full-width d-flex flex-column align-center"
  >
    <microphone-input-options></microphone-input-options>
    <microphone-input-result></microphone-input-result>
    <microphone-input-listen-button></microphone-input-listen-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import MicrophoneInputOptions from "./MicrophoneInputOptions";
import MicrophoneInputResult from "./MicrophoneInputResult";
import MicrophoneInputListenButton from "./MicrophoneInputListenButton";

export default {
  computed: {
    ...mapGetters(["lyricsInputType", "speechLang"])
  },
  components: {
    "microphone-input-options": MicrophoneInputOptions,
    "microphone-input-result": MicrophoneInputResult,
    "microphone-input-listen-button": MicrophoneInputListenButton
  }
};
</script>
