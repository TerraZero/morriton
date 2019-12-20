<template lang="pug">
  .screen
    link(href="https://fonts.googleapis.com/css?family=Girassol&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css?family=Nothing+You+Could+Do&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css?family=Yellowtail&display=swap", rel="stylesheet")
    .page
      .writing-one
      .writing-two
      .writing-three

</template>

<script>
import Vara from "vara";

export default {
  components: {},
  mounted() {
    const text = "Handwritten";
    const options = {
      fontSize: 46,
      letterSpacing: 3,
      strokeWidth: 2
    };
    new Vara(".writing-one", "/font/SatisfySL.json", [{ text }], options);
    new Vara(".writing-two", "/font/PacificoSLO.json", [{ text }], options);
    new Vara(".writing-three", "/font/Parisienne.json", [{ text }], options);
  }
};
</script>

<style lang="sass">
  .screen
    overflow: hidden
    width: 100%

  .page
    overflow: hidden

</style>
