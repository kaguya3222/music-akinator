<template>
  <div class="d-flex justify-center align-center">
    <game-name v-if="step === 1"></game-name>
    <game-card v-if="step === 2"></game-card>
    <game-result v-if="step === 3"></game-result>
    <session-result v-if="step === 4"></session-result>
  </div>
</template>

<script>
import Name from "./GameName";
import GameCard from "./GameCard";
import Result from "./GameResult";
import SessionResult from "./GameSessionResult";

import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["step"])
  },
  components: {
    "game-name": Name,
    "game-card": GameCard,
    "game-result": Result,
    "session-result": SessionResult
  },
  methods: {}
};
</script>
