<template>
  <div>
    <span>Выберите тип ввода слов из песни:</span>
    <div class="d-flex justify-center align-center full-width bord">
      <v-btn
        v-for="(button, index) in buttons"
        :key="index"
        text
        icon
        color="blue-grey"
        :x-large="true"
        @click="changeLyricsInputType({ payLoad: button.value })"
        ><v-icon>{{ button.iconName }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      buttons: [
        {
          value: "micro",
          iconName: "mdi-microphone"
        },
        {
          value: "keyboard",
          iconName: "mdi-keyboard"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["changeLyricsInputType"])
  }
};
</script>
