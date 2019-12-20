<template lang="pug">
  .background-screen(:class="classes")
    #video-player.background-screen--video
    .background-screen--text(v-if="background && background.type === 'text'")
      img.background-screen--text-bg(:src="require('@/assets/images/' + background.image)")
      .background-screen--text-wrapper
        .background-screen--writing
    .background-screen--image(v-if="background && background.type === 'image'")
      img.background-screen--image(:src="require('@/assets/images/' + background.image)")
</template>

<script>
import client from "~/plugins/client/socket";

export default {
  props: ["scene", "scenedata"],
  data() {
    return {
      shadow: false
    };
  },
  computed: {
    background() {
      if (this.scene && this.scene.scene) {
        for (const id of this.scene.scene) {
          const item = this.scenedata[id];

          if (item.group === "scene") {
            return item;
          }
        }
      }
      return null;
    },
    classes() {
      const classes = [];

      if (this.background && this.background.type === "video") {
        classes.push("has-bg");
      }
      if (this.background && this.background.type === "text") {
        classes.push("has-text");
        classes.push("font-" + this.background.font);
      }
      if (this.shadow) {
        classes.push("has-shadow");
      }
      return classes;
    }
  },
  mounted() {
    client.addVideo("video-player");
    client.writing(".background-screen--writing", this);
  }
};
</script>

<style lang="sass">
  .background-screen
    width: 100%
    height: 100%
    position: relative

    &.font-letter
      font-family: 'Yellowtail', cursive
      font-size: 50px
      color: black

    &--video
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      width: 100%
      height: 100%

    &--image
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      width: 100%
      height: 100%

    &--text
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      width: 100%
      height: 100%

      &:before
        content: ''
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: rgba(0, 0, 0, 0)
        z-index: 1
        transition: background 1s ease-in-out

        .has-shadow &
          background: rgba(0, 0, 0, .85)

      &-wrapper
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        width: 100%
        height: 100%
        padding: 50px
        box-sizing: border-box
        max-width: 1860px
        margin: 0 auto
        z-index: 2
        filter: drop-shadow(0 0 3px white)

      &-line
        line-height: 50px
        min-height: 50px

      &-bg
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        width: 100%
        height: 100%
</style>
