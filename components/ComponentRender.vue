<template lang="pug">
  component(v-if="type === 0", :is="componentInstance[0]", :vars="vars")
  .component_render(v-else-if="type === 1", :class="classes")
    component(v-for="(comp, index) in renderArray", :is="componentInstance[index]", :key="index", :vars="comp")
  .component_render(v-else-if="type === 2", :class="classes")
    | {{ vars }}
</template>

<script>
export default {
  name: "ComponentRender",
  props: ["vars", "component", "classes"],
  computed: {
    type() {
      if (typeof this.component === "string") {
        return 0;
      }
      if (Array.isArray(this.vars)) {
        return 1;
      }
      if (typeof this.vars === "string") {
        return 2;
      }
      if (this.vars && typeof this.vars === "object") {
        return 0;
      }
      return -1;
    },
    renderArray() {
      if (Array.isArray(this.vars)) {
        return this.vars;
      } else if (this.vars) {
        return [this.vars];
      } else {
        return [];
      }
    },
    componentInstance() {
      if (typeof this.component === "string") {
        return [() => import("~/components/" + this.component + ".vue")];
      }
      const comps = [];

      for (const comp of this.renderArray) {
        if (comp.component) {
          comps.push(() => import("~/components/" + comp.component + ".vue"));
        } else {
          comps.push(null);
        }
      }
      return comps;
    }
  }
};
</script>
