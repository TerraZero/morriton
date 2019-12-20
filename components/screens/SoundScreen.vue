<template lang="pug">
  .background-screen
    #video-player.background-screen--video(:class="classes")
</template>

<script>
const Player = require("youtube-player");
const videos = {
  background: {
    player: null,
    video: null
  }
};

function play(target, video) {
  videos[target].video = video;
  if (videos[target].player === null) {
    setTimeout(function() {
      play(target, video);
    }, 100);
  } else {
    videos[target].player.loadVideoById(video);
    videos[target].player.setVolume(video.volume || 0);
    videos[target].player.playVideo();
  }
}

export default {
  props: ["scene", "scenedata"],
  computed: {
    background() {
      if (this.scene && this.scene.scene) {
        for (const id of this.scene.scene) {
          const item = this.scenedata[id];

          if (item.group === "background") {
            return item;
          }
        }
      }
      return null;
    },
    classes() {
      const classes = [];

      if (this.background && this.background.type === "video") {
        play("background", this.background.video);
        classes.push("has-bg");
      }
      if (this.background && this.background.type === "text") {
        classes.push("has-bg");
      }
      return classes;
    }
  },
  mounted() {
    videos.background.player = Player("video-player");
    if (videos.background.video !== null) {
      play("background", videos.background.video);
    }
  }
};
</script>

<style lang="sass">
  .background-screen
    width: 100%
    height: 100%
    position: relative

    &--video
      width: 100%
      height: 100%
</style>
