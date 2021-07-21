<template>
  <div class="lo-user">
    <header>
      <ul class="brand__search">
        <li class="brand" @click="$router.go(0)">Tuos</li>
        <li class="search">
          <form action="">
            <input type="text" placeholder="Search" name="q" />
          <button type="Submit">
            <i class="fa fa-search"></i>
          </button>
          </form>
        </li>
      </ul>
      <ul class="main__navi">
        <li>
          <router-link to="/home">
            <i class="fa fa-home"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/settings">
            <i class="fa fa-cog"></i>
          </router-link>
        </li>
      </ul>
    </header>
    <div class="main">
      <slot />
    </div>
  </div>
</template>
<script>
import "../styles/lo-user.scss";
export default {
  name: "layoutUser",
};
</script>