<template lang="pug">
  .music-screen
    #music-video
    #sound-video
</template>

<script>
import client from "~/plugins/client/socket";

export default {
  mounted() {
    client.addVideo("music-video");
    client.addSound("sound-video");
  }
};
</script>

<style lang="sass">
  .music-screen
    position: absolute
    left: 0
    bottom: 100%
</style>
