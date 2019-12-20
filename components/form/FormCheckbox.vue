<template lang="pug">
  label.form-checkbox(:class="classes")
    span.form-checkbox--label
      | {{ field.label }}
    input(type="checkbox", :value="field.id", v-model="checked", @change="onChange")
</template>

<script>
export default {
  props: ["field", "value", "active"],
  data() {
    return {
      checkedProxy: []
    };
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      }
    },
    classes() {
      const classes = [];

      if (this.active) {
        classes.push("form-checkbox--active");
      }
      return classes;
    }
  },
  methods: {
    onChange: function(e) {
      this.$emit("input", this.checkedProxy);
    }
  }
};
</script>

<style lang="sass">
  .form-checkbox
    display: flex
    padding: 10px

    &--active
      background: #0AA

    &--label
      width: 100%
</style>
