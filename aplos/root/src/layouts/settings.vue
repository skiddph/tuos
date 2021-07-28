<template>
  <div class="lo-settings">
    <div class="sidebar">
      <router-link to="/settings">
        <i class="fa fa-user"></i>
        <span>Edit Profile</span>
      </router-link>
      <router-link to="/home">
      <i class="fa fa-home"></i>
        <span>Home</span></router-link>
    </div>
    <div class="main-activity">
      <slot />
    </div>
  </div>
</template>
<script>
// import "../styles/lo-settings.scss";
export default {};
</script>