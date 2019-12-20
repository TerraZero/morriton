<template lang="pug">
  .control-screen
    .control-screen--top
      .control-screen--map.control-screen--even
        FormCheckbox(v-for="(field, index) in form.maps", :key="index", v-model="bag.maps", :active="isActive('maps', field.id)", @input="onChange(field, 'maps')", :field="field")
      .control-screen--scene.control-screen--even
        FormCheckbox(v-for="(field, index) in form.scene", :key="index", v-model="bag.scene", :active="isActive('scene', field.id)", @input="onChange(field, 'scene')", :field="field")
      .control-screen--sound.control-screen--even
        FormCheckbox(v-for="(field, index) in form.sound", :key="index", v-model="bag.sound", :active="isActive('sound', field.id)", @input="onChange(field, 'sound')", :field="field")

    .control-screen--bottom
      .control-screen--level
        .control-screen--level-item
          .control-screen--level-item-current
            | Music: {{ bag.volume.sound }}
          input.control-screen--level-item-range(type="range", min="0", max="100", v-model="bag.volume.sound")
        .control-screen--level-item
          .control-screen--level-item-current
            | Scene: {{ bag.volume.scene }}
          input.control-screen--level-item-range(type="range", min="0", max="100", v-model="bag.volume.scene")
      .control-screen--show
        FormCheckbox(v-model="bag.show", :active="isActive('show', show.floor_0.id)", @input="onChange(show.floor_0, 'show')", :field="show.floor_0")
        FormCheckbox(v-model="bag.show", :active="isActive('show', show.floor_1.id)", @input="onChange(show.floor_1, 'show')", :field="show.floor_1")
        FormCheckbox(v-model="bag.show", :active="isActive('show', show.floor_2.id)", @input="onChange(show.floor_2, 'show')", :field="show.floor_2")
        FormCheckbox(v-model="bag.show", :active="isActive('show', show.scene.id)", @input="onChange(show.scene, 'show')", :field="show.scene")
    input.control-screen--submit(type="button", value="UPDATE", @click="action")

</template>

<script>
import client from "~/plugins/client/socket";

export default {
  components: {
    FormCheckbox: () => import("@/components/form/FormCheckbox")
  },
  data() {
    return {
      show: {
        floor_0: {
          label: "Etage 0",
          id: "floor_0"
        },
        floor_1: {
          label: "Etage 1",
          id: "floor_1"
        },
        floor_2: {
          label: "Etage 2",
          id: "floor_2"
        },
        scene: {
          label: "Scene",
          id: "scene"
        }
      },
      bag: {
        maps: [],
        scene: [],
        sound: [],
        show: [],
        volume: {
          sound: 100,
          scene: 0
        }
      }
    };
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
    form() {
      const formdata = {
        maps: {},
        scene: {},
        sound: {},
        master: this.master
      };

      if (this.mapdata !== null) {
        for (const id in this.mapdata) {
          formdata.maps[id] = {
            label: this.mapdata[id].name,
            id: id,
            group: this.mapdata[id].group
          };
        }
      }

      if (this.scenedata !== null) {
        for (const id in this.scenedata) {
          formdata.scene[id] = {
            label: this.scenedata[id].name,
            id: id,
            group: this.scenedata[id].group
          };
        }
      }

      if (this.sounddata !== null) {
        for (const id in this.sounddata) {
          formdata.sound[id] = {
            label: this.sounddata[id].name,
            id: id,
            group: this.sounddata[id].group
          };
        }
      }
      return formdata;
    }
  },
  methods: {
    isActive(type, id) {
      return this.bag[type].includes(id);
    },
    action() {
      client.update(this.bag);
    },
    onChange(field, type) {
      if (type !== "maps") {
        if (this.bag[type].includes(field.id)) {
          this.bag[type] = [field.id];
        }
      }
      if (type === "maps") {
        this.bag.show = ["floor_0"];
      }
      if (type === "scene") {
        this.bag.show = ["scene"];
      }
      if (type !== "sound" && this.bag[type].length === 0) {
        this.bag.show = [];
      }
    }
  }
};
</script>

<style lang="sass">
  .control-screen
    display: flex
    flex-direction: column
    width: 100%
    height: 100vh

    &--top
      display: flex
      height: 100%
      padding: 30px

    &--bottom
      display: flex
      flex-direction: column
      padding-bottom: 50px

    &--level
      display: flex

      &-item
        width: 100%
        padding: 20px

        &-range
          width: 100%

    &--show
      display: flex
      width: 100%
      > .form-checkbox
        width: 100%

    &--even
      display: flex
      width: 100%
      flex-direction: column
      max-height: 100%
      overflow: auto

      &-item
        display: flex
        padding: 10px

        &---active
          background: #0AA

        label
          width: 100%

    &--master
      display: flex
      justify-content: center
      width: 100%

    &--submit
      padding: 20px
      background: #033
      border: 0
      outline: 0
</style>
