<template>
  <div v-if="isSpeechLangChosen" class="mb-2">
    <v-btn @click="listenMicro()" color="blue-grey" dark text
      >Напеть еще раз</v-btn
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      recognitionEngine: null
    };
  },
  computed: {
    ...mapGetters(["speechLang", "isSpeechLangChosen", "lyricsInputType"])
  },
  methods: {
    listenMicro() {
      this.recognitionEngine.interimResults = true;
      this.recognitionEngine.lang = this.speechLang;
      this.recognitionEngine.addEventListener("result", e => {
        this.$store.dispatch("setLyrics", {
          payLoad: e.results[0][0].transcript
        });
      });
      this.recognitionEngine.start();
    }
  },
  watch: {
    isSpeechLangChosen: {
      handler() {
        this.listenMicro();
      }
    }
  },
  mounted() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognitionEngine = new window.SpeechRecognition();
  },
  destroyed() {
    this.recognitionEngine.stop();
    this.recognitionEngine.addEventListener("end", () => {
      this.$store.dispatch("setLyrics", { payLoad: null });
    });
  }
};
</script>
