<template>
  <form class="d-flex flex-column">
    <span>Введите свой никнейм:</span>
    <v-text-field
      type="text"
      color="blue-grey"
      v-model="name"
      id="name"
    ></v-text-field>
    <v-btn class="align-self-center" color="blue-grey" dark @click="nextStep()"
      >Играть</v-btn
    >
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: null
    };
  },
  computed: {
    ...mapGetters(["step"])
  },
  methods: {
    ...mapActions(["increaseStep", "changeName"]),
    nextStep() {
      this.changeName({ payLoad: this.name });
      this.increaseStep();
    }
  }
};
</script>
