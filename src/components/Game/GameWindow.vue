<template>
  <div class="d-flex justify-center align-center">
    <name v-if="step === 1"></name>
    <game v-if="step === 2"></game>
    <result v-if="step === 3"></result>
  </div>
</template>

<script>
import Name from "./Name";
import Game from "./Game";
import Result from "./Result";

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
    game: Game,
    result: Result
  },
  methods: {}
};
</script>
