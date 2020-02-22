<template>
  <div>
    <span class="my-1">Да это же...</span>
    <div>
      <span
        >{{ answers[answerIndex].artist }} -
        {{ answers[answerIndex].title }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["answers", "answerIndex"])
  }
};
</script>
