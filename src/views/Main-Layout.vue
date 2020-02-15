<template>
  <v-app id="inspire">
    <v-app-bar app color="blue-grey" dark class="d-flex justify-center">
      <v-toolbar-title>Music akinator</v-toolbar-title>
    </v-app-bar>

    <v-content class="d-flex justify-center align-center">
      <game-window></game-window>
    </v-content>
    <v-footer color="blue-grey" app>
      <span class="white--text">&copy; BornedToCode 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import GameWindow from "../components/Game/Game";

export default {
  data: () => ({}),
  components: {
    "game-window": GameWindow
  }
};
</script>
