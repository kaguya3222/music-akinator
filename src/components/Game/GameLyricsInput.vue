<template>
  <div class="mt-2">
    <span>Выберите тип ввода слов из песни:</span>
    <div class="d-flex justify-center align-center full-width">
      <v-btn
        text
        icon
        color="blue-grey"
        :x-large="true"
        @click="changeLyricsInputType({ payLoad: 'micro' })"
        ><v-icon>mdi-microphone</v-icon></v-btn
      >
      <v-btn
        text
        icon
        color="blue-grey"
        :x-large="true"
        @click="changeLyricsInputType({ payLoad: 'keyboard' })"
        ><v-icon>mdi-keyboard</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["changeLyricsInputType"])
  }
};
</script>
