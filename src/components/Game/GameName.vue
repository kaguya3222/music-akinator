<template>
  <v-form class="d-flex flex-column">
    <v-text-field
      type="text"
      color="blue-grey"
      v-model="$v.name.$model"
      id="name"
      label="Введите никнейм"
      :error-messages="nameErrors"
      :success="!$v.name.$invalid"
    ></v-text-field>
    <v-btn
      class="align-self-center mt-2"
      color="blue-grey"
      :dark="!isDisabled"
      @click="nextStep()"
      :disabled="isDisabled"
      >Играть</v-btn
    >
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import { required, maxLength } from "vuelidate/lib/validators";

import validationHelpers from "../../mixins/validationHelpers";
import { validationMixin } from "vuelidate";

export default {
  data() {
    return {
      name: null
    };
  },
  computed: {
    ...mapGetters(["step"]),
    nameErrors() {
      let errors = [];
      if (!this.$v.name.$dirty) return errors;
      errors = this.checkIfErrorShouldAppend({
        field: this.$v.name,
        errors,
        errorMessage: "Это поле обязательно!",
        errorType: "required"
      });
      errors = this.checkIfErrorShouldAppend({
        field: this.$v.name,
        errors,
        errorMessage: "Максимальная длинна никнейма 10 символов!",
        errorType: "maxLength"
      });
      return errors;
    },
    isDisabled() {
      return this.$v.$invalid;
    }
  },
  validations: {
    name: { required, maxLength: maxLength(10) }
  },
  methods: {
    ...mapActions(["increaseStep", "changeName"]),
    nextStep() {
      this.changeName({ payLoad: this.name });
      this.increaseStep();
    }
  },
  mixins: [validationHelpers, validationMixin]
};
</script>
