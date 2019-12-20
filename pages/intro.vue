<template lang="pug">
  .screen
    link(href="https://fonts.googleapis.com/css?family=Girassol&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css?family=Nothing+You+Could+Do&display=swap", rel="stylesheet")
    link(href="https://fonts.googleapis.com/css?family=Yellowtail&display=swap", rel="stylesheet")
    .page
      .intro
        .intro--background
          img.intro--background-img(:src="require('@/assets/images/intro/Intro.jpg')")
        .intro--cols
          .intro--col(v-for="(image, index) in images", :key="index", :class="classes(image, index)")
            .intro--col-mask
              img.intro--col-img(:src="require('@/assets/images/' + image.src)")
            .intro--col-text
              | {{ image.text }}
          .intro--col-shade

</template>

<script>
export default {
  components: {},
  data() {
    return {
      images: [
        {
          src: "intro/butler.jpg",
          active: false,
          text: "Butler",
          focus: false
        },
        {
          src: "intro/agraf.jpg",
          active: false,
          text: "Alter Graf",
          focus: false
        },
        {
          src: "intro/jgraf.jpg",
          active: false,
          text: "Junger Graf",
          focus: false
        },
        { src: "intro/doc.jpg", active: false, text: "Der Doc", focus: false }
      ]
    };
  },
  methods: {
    classes(image, index) {
      const classes = [
        "intro--col-" + index,
        "intro--col-" + (index % 2 === 0 ? "top" : "bottom")
      ];

      if (image.active) {
        classes.push("intro--col--active");
      }
      if (image.focus) {
        classes.push("intro--col--focus");
      }
      return classes;
    }
  },
  mounted() {
    this._interval = setInterval(() => {
      for (const item of this.images) {
        item.focus = false;
        if (!item.active) {
          item.active = true;
          item.focus = true;
          break;
        }
      }
      if (
        this.images[this.images.length - 1].active &&
        !this.images[this.images.length - 1].focus
      ) {
        for (const item of this.images) {
          item.focus = true;
        }
      }
    }, 3000);
  }
};
</script>

<style lang="sass">
  .screen
    overflow: hidden
    width: 100%

  .page
    overflow: hidden

  .intro

    &--background
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0

      &-img
        width: 100%
        height: 100%

    &--cols
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      display: flex

    &--col
      width: 100%
      height: 100%
      transition: transform .5s ease-in-out

    &--col-top
      transform: translateY(-100%)

    &--col-bottom
      transform: translateY(100%)

    &--col--active
      transform: translateY(0)
      transition: transform .5s .5s ease-in-out

    &--col--focus
      z-index: 1

    &--col-mask
      clip-path: polygon(20% 0, 100% 0, 80% 100%, 0 100%)
      background: black
      width: 100%
      height: 100%

    &--col-img
      width: calc(100% - 30px)
      height: calc(100% - 30px)
      clip-path: polygon(20% 0, 100% 0, 80% 100%, 0 100%)
      margin: 15px

    &--col-text
      position: absolute
      width: 20%
      font-size: 70px
      color: black
      font-weight: 900
      font-family: 'Yellowtail', cursive
      text-shadow: 3px 3px 4px white

    &--col-0.intro--col--focus &--col-text
      top: 30%
      left: 100%
      z-index: 100000

    &--col-shade
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, .5)

</style>
