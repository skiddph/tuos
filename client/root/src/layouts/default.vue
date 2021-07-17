<template>
  <div class="lo-default">
    <div class="main">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "defaultLayout",
};
</script>
<style lang="scss" scoped>
.lo-default {
  min-width: 100vw;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  .main {
    min-width: 30vw;
  }
}
</style>