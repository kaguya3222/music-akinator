<template>
  <div
    v-show="this.lyrics"
    class="d-flex flex-column align-center"
    v-if="isSpeechLangChosen"
  >
    <p>Вы напели:</p>
    <p>{{ this.lyrics }}</p>
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
    ...mapGetters(["lyrics", "isSpeechLangChosen"])
  }
};
</script>
