<template lang="pug">
  .screen
    link(href="https://fonts.googleapis.com/css?family=Girassol&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css?family=Nothing+You+Could+Do&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css?family=Yellowtail&display=swap", rel="stylesheet")
    .screen--page
      SceneScreen
    ConnectionDisplay
</template>

<script>
import client from "~/plugins/client/socket";

export default {
  components: {
    SceneScreen: () => import("@/components/screens/SceneScreen"),
    ConnectionDisplay: () => import("@/components/overlays/ConnectionDisplay")
  },
  computed: {},
  mounted() {
    client.init("scene");
  }
};
</script>

<style lang="sass">
  body
    width: 100vw
    height: 100vh

  .screen
    width: 100%
    height: 100%

    &__overlay
      position: relative
      width: 100%
      height: 100%

    &--page
      width: 100%
      height: 100%
</style>
