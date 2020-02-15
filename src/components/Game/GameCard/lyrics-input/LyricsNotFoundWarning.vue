<template>
  <v-dialog v-model="areAnswersEmpty" max-width="620">
    <v-card class="py-3 px-3">
      <p>
        Упс... Я даже представить не могу что это... Может ты напишешь поточнее?
      </p>

      <div class="full-width d-flex justify-center align-center">
        <v-btn color="green" @click="areAnswersEmpty = false">Я попробую</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      closed: false,
      areAnswersEmpty: false
    };
  },
  computed: {
    ...mapGetters(["answers", "areAnswersReceived"])
  },
  watch: {
    areAnswersReceived: {
      handler(value) {
        if (value) {
          this.areAnswersEmpty = this.answers.length === 0;
        }
      }
    }
  }
};
</script>
