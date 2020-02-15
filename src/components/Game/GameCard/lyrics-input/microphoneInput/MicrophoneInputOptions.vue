<template>
  <div class="d-flex flex-column align-center" v-if="!isSpeechLangChosen">
    <span>Выберите язык ввода:</span>
    <v-radio-group class="d-flex flex-column">
      <v-radio
        v-for="(language, index) in languages"
        @change="changeSpeechLang({ payLoad: language.value })"
        :key="index"
        :label="language.label"
        :value="language.value"
      ></v-radio>
      <v-btn
        class="align-self-center"
        text
        icon
        color="green"
        v-show="speechLang"
        @click="chooseLanguage()"
        ><v-icon>mdi-check</v-icon></v-btn
      >
    </v-radio-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isSpeechLangChosen", "languages", "speechLang"])
  },
  methods: {
    ...mapActions(["changeSpeechLang", "chooseLanguage"])
  }
};
</script>
