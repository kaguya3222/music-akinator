<template>
  <div class="full-width d-flex justify-center">
    <answer-button
      v-for="(button, index) in buttons"
      :key="index"
      :button="button"
    ></answer-button>
  </div>
</template>

<script>
import AnswerButton from "./AnswerButton";

export default {
  data() {
    return {
      buttons: [
        {
          iconName: "mdi-check",
          actionName: "endGame",
          color: "green",
          actionParams: ["victory"],
          tooltipTitle: "Верно"
        },
        {
          iconName: "mdi-play",
          actionName: "changeListenStatus",
          color: "blue-grey",
          tooltipTitle: "Прослушать"
        },
        {
          iconName: "mdi-close",
          actionName: "nextAttempt",
          color: "red",
          tooltipTitle: "Не верно"
        }
      ]
    };
  },
  components: {
    "answer-button": AnswerButton
  }
};
</script>
