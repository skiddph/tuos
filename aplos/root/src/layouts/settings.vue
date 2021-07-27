<template>
  <div class="lo-settings">
    <div class="left-nav">
      <router-link to="/settings">Edit Profile</router-link>
      <router-link to="/home">Home</router-link>
    </div>
    <div class="main">
      <slot />
    </div>
  </div>
</template>
<script>
import "../styles/lo-settings.scss";
export default {};
</script>