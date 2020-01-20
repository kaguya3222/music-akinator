<template>
  <div>
    <Victory v-if="result === 'victory'"></Victory>
    <Defeat v-if="result === 'defeat'"></Defeat>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Victory from "./Victory";
import Defeat from "./Defeat";

export default {
  components: {
    Victory,
    Defeat
  },
  computed: {
    ...mapGetters(["result"])
  }
};
</script>
