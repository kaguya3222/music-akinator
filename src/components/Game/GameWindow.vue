<template>
  <div class="d-flex justify-center align-center">
    <name v-if="step === 1"></name>
    <game v-if="step === 2"></game>
  </div>
</template>

<script>
import Name from "./Name";
import Game from "./Game";

import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["step"])
  },
  components: {
    name: Name,
    game: Game
  },
  methods: {}
};
</script>
