<template>
  <div
    v-if="lyricsInputType === 'keyboard'"
    class="d-flex flex-column align-center"
  >
    <v-textarea
      class="input-width mt-2"
      color="blue-grey"
      label="Строчки из песни"
      :auto-grow="true"
      v-model.trim="$v.textLyrics.$model"
      @input="setLyrics({ payLoad: textLyrics })"
      :error-messages="lyricsErrors"
      :success="!$v.textLyrics.$invalid"
    ></v-textarea>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import validationHelpers from "../../../mixins/validationHelpers";

import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      textLyrics: null
    };
  },
  computed: {
    ...mapGetters(["lyricsInputType"]),
    lyricsErrors() {
      let errors = [];
      if (!this.$v.textLyrics.$dirty) return errors;
      errors = this.checkIfErrorShouldAppend({
        field: this.$v.textLyrics,
        errors,
        errorMessage: "Это поле обязательно!",
        errorType: "required"
      });
      return errors;
    }
  },
  methods: {
    ...mapActions(["setLyrics"])
  },
  validations: {
    textLyrics: {
      required
    }
  },
  mixins: [validationMixin, validationHelpers]
};
</script>
