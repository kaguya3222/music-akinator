<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        text
        icon
        :color="button.color"
        :x-large="true"
        v-on="on"
        @click="clickCallback()"
        ><v-icon>{{ button.iconName }}</v-icon></v-btn
      >
    </template>
    <span>{{ button.tooltipTitle }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    button: {
      required: true,
      type: Object
    }
  },
  methods: {
    clickCallback() {
      this.button.actionParams
        ? this.$store.dispatch(this.button.actionName, {
            payLoad: this.button.actionParams
          })
        : this.$store.dispatch(this.button.actionName);
    }
  }
};
</script>
