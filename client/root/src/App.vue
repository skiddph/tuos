<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(import.meta.env);
    console.log(this.$tuos)
  },
};
</script>