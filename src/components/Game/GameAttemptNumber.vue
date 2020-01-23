<template>
  <div class="d-flex full-width">
    <span>{{ name }}</span>
    <span class="ml-auto">Попытка {{ attemptNumber }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["name", "attemptNumber"])
  }
};
</script>
