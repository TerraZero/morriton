<template lang="pug">
  transition(name="swap-right")
    .connection-display(v-if="show", :class="['connection-display--' + state]")
      .connection-display--icon
        | {{ icon }}
</template>

<script>
export default {
  computed: {
    show() {
      return this.state !== "none";
    },
    state() {
      return this.$store.state.meta.connectionState;
    },
    icon() {
      switch (this.state) {
        case "connected":
          return "✓";
        case "reconnecting":
          return "⟳";
      }
    }
  }
};
</script>

<style lang="sass">
  .connection-display
    position: absolute
    top: 50px
    right: 0
    display: inline-block
    padding: 20px 40px
    font-size: 45px
    border: 1px solid white
    border-right-width: 0
    background: #333
</style>
