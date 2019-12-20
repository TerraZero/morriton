<template lang="pug">
  .map-screen
    img.map-screen--image(v-for="(map, index) in maps", :key="index", :src="require('@/assets/images/' + map.image)")
</template>

<script>
export default {
  props: ["scene", "mapdata"],
  computed: {
    maps() {
      const images = [];

      images.push(this.mapdata[this.scene.show[0]]);

      if (this.scene.show[0] === "floor_0") {
        for (const id of this.scene.maps) {
          if (this.mapdata[id].group === "map") {
            images.push(this.mapdata[id]);
          }
        }
      }
      return images;
    }
  }
};
</script>

<style lang="sass">
  .map-screen
    width: 100%
    height: 100%
    position: relative

    &--image
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      width: 100%
      height: 100%
</style>
