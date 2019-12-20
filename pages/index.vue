<template lang="pug">
  .screen
    link(href="https://fonts.googleapis.com/css?family=Girassol&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css?family=Nothing+You+Could+Do&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css?family=Yellowtail&display=swap", rel="stylesheet")
    .page
      ControlScreen
    ConnectionDisplay
</template>

<script>
import client from "~/plugins/client/socket";

export default {
  components: {
    ControlScreen: () => import("@/components/screens/ControlScreen"),
    ConnectionDisplay: () => import("@/components/overlays/ConnectionDisplay")
  },
  mounted() {
    client.init("control");
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
