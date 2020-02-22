<template>
  <v-list-item-content>
    <v-list-item-title
      >{{ index + 1 }}. {{ answer.artist }} -
      {{ answer.title }}</v-list-item-title
    >
  </v-list-item-content>
</template>

<script lang="js">
export default {
  props: {
    answer: Object,
    index: Number
  }
};
</script>
