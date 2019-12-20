<template lang="pug">
  .scene-screen
    MusicScreen
    MapScreen(v-if="show.map", :mapdata="mapdata", :scene="scene")
    BackgroundScreen(v-if="show.scene", :scenedata="scenedata", :scene="scene")
</template>

<script>
import client from "~/plugins/client/socket";

export default {
  components: {
    MapScreen: () => import("@/components/screens/MapScreen"),
    BackgroundScreen: () => import("@/components/screens/BackgroundScreen"),
    MusicScreen: () => import("@/components/screens/MusicScreen")
  },
  computed: {
    mapdata() {
      return this.$store.state.meta.mapdata;
    },
    scenedata() {
      return this.$store.state.meta.scenedata;
    },
    sounddata() {
      return this.$store.state.meta.sounddata;
    },
    scene() {
      return this.$store.state.meta.scene;
    },
    show() {
      const show = {
        map: false,
        scene: false,
        sound: false
      };
      if (this.scene && this.scene.show.length) {
        for (const item of this.scene.show) {
          switch (item) {
            case "floor_0":
            case "floor_1":
            case "floor_2":
              show.map = true;
              break;
            case "scene":
              show.scene = true;
              break;
            case "sound":
              show.sound = true;
          }
        }
      }
      return show;
    }
  }
};
</script>

<style lang="sass">
  .scene-screen
    width: 100%
    height: 100%
</style>
