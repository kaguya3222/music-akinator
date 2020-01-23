<template>
  <div>
    <v-card class="d-flex flex-column align-center game-card px-2 py-2">
      <v-card-title>Итог игры за сессию:</v-card-title>
      <p>Набрано очков: {{ points }}</p>
      <v-btn color="blue-grey" dark @click="backToMenu"
        >Вернуться в главное меню</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["points"])
  },
  methods: {
    ...mapActions(["changePoints"]),
    resetPoints() {
      this.changePoints({ payLoad: 0 });
    },
    backToMenu() {
      this.resetPoints();
      this.$store.dispatch("changeStep", { payLoad: 1 });
    }
  }
};
</script>
