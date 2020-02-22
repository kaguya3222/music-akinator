<template>
  <MainLayout />
</template>

<script>
import MainLayout from "./layouts/Main-Layout";

export default {
  name: "App",

  components: {
    MainLayout
  }
};
</script>

<style lang="scss">
.bordered {
  border: 1px solid black;
}

.full-width {
  width: 100%;
}

.input-width {
  width: 250px;
}
</style>
