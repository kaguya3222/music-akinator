<template>
  <div>
    <Victory v-if="result === 'victory'"></Victory>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Victory from "./Victory";

export default {
  components: {
    Victory
  },
  computed: {
    ...mapGetters(["result"])
  }
};
</script>
