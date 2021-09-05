<template>
  <router-link :to="to">
      <slot>
            <i :class="icon"></i>
            <span>{{ name }}</span>
      </slot>
  </router-link>
</template>
<script>
export default {
  name: "Wf1SidebarItem",
  props: {
    to: String | Object,
    icon: {
      type: String,
      default: "fa fa-home",
    },
    name: {
      type: String,
      default: "Link",
    }
  },
};
</script>