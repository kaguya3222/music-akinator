export default {
  methods: {
    checkIfErrorShouldAppend({ field, errors, errorMessage, errorType }) {
      !field[errorType] && field.$error && errors.push(errorMessage);
      return errors;
    }
  }
};
