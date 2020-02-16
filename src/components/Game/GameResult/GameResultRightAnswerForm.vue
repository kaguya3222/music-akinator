<template>
  <v-form class="full-width d-flex flex-column justify-center align-center">
    <span>Введите правильный ответ, пожалуйста, что бы я стал умнее :)</span>
    <div
      v-if="!isRightAnswerSent"
      class="d-flex flex-column align-center justify-center mb-5"
    >
      <v-text-field
        type="text"
        id="artist-answer"
        color="blue-grey"
        label="Исполнитель"
        class="input-width mt-2"
        v-model="$v.userRightAnswer.artist.$model"
        :error-messages="artistErrors"
        :success="!this.$v.userRightAnswer.artist.$invalid"
      ></v-text-field>
      <v-text-field
        type="text"
        id="title-answer"
        color="blue-grey"
        label="Название"
        class="input-width mt-2"
        v-model="$v.userRightAnswer.title.$model"
        :error-messages="titleErrors"
        :success="!this.$v.userRightAnswer.title.$invalid"
      ></v-text-field>
      <v-btn
        text
        icon
        color="blue-grey"
        @click="sendRightAnswer()"
        class="mt-2"
        :disabled="isFormSubmitButtonDisabled"
        >Ответить</v-btn
      >
    </div>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

import validationHelpers from "../../../mixins/validationHelpers";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      userRightAnswer: {
        artist: null,
        title: null
      }
    };
  },
  computed: {
    ...mapGetters(["isRightAnswerSent", "isFormSubmitButtonDisabled"]),
    titleErrors() {
      let errors = [];
      if (!this.$v.userRightAnswer.title.$dirty) return errors;
      errors = this.checkIfErrorShouldAppend({
        field: this.$v.userRightAnswer.title,
        errors,
        errorMessage: "Это поле обязательно!",
        errorType: "required"
      });
      return errors;
    },
    artistErrors() {
      let errors = [];
      if (!this.$v.userRightAnswer.artist.$dirty) return errors;
      errors = this.checkIfErrorShouldAppend({
        field: this.$v.userRightAnswer.artist,
        errors,
        errorMessage: "Это поле обязательно!",
        errorType: "required"
      });
      return errors;
    }
  },
  methods: {
    sendRightAnswer() {
      this.$store.dispatch("changeIsRightAnswerSent", { payLoad: true });
      this.$store.dispatch("setRightAnswer", { payLoad: this.userRightAnswer });
    }
  },
  validations: {
    userRightAnswer: {
      artist: { required },
      title: { required }
    }
  },
  mixins: [validationHelpers, validationMixin],
  watch: {
    $v: {
      handler(value) {
        this.$store.dispatch("changeIsFormSubmitButtonDisabled", {
          payLoad: value.$invalid
        });
      },
      deep: true
    }
  }
};
</script>
