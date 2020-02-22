export default {
  methods: {
    removeLinebreaks({ str }) {
      return str.replace(/[\r\n]+/gm, " ");
    },
    parseRussianTitle({ title }) {
      if (title.indexOf("(") >= 0) {
        return title.slice(0, -(title.length - title.indexOf("(")));
      }
      return title;
    },
    removeDuplicates({ array }) {
      return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
    }
  }
};
