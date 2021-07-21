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
          <router-link to="/home" @click="menu = false">
            <i class="fa fa-home"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/settings" @click="menu = false">
            <i class="fa fa-cog"></i>
          </router-link>
        </li>
        <li>
          <div class="menu" :active="menu">
            <a href="#" class="toggle-menu" @click="menu = !menu">
              <i class="fa fa-caret-down"></i>
            </a>
            <div class="menu-content">
              <div class="items">
                <router-link to="/logout" class="item">
                  <i class="fa fa-sign-out"></i>
                  <span>Logout</span>
                </router-link>
              </div>
            </div>
          </div>
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
  data: () => ({
    menu: false
  })
};
</script>