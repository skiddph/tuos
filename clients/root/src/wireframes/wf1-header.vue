<template>
  <teleport to="#header">
    <header wf1>
      <div class="header">
        <slot>
          <ul class="brand__group">
            <li class="title" @click="gotoHome">Tuos</li>
            <li class="search">
              <form action="/search">
                <input type="text" placeholder="Search" name="q" />
                <button type="submit">
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
                  <div class="match-width">
                    <div class="items">
                      <router-link v-if="$store.state.userdataState == 'success'" :to="`/user/@${$store.state.userdata.user}`" class="item" @click="menu = !menu">
                        <i class="fa fa-user-circle"></i>
                        <span>Profile</span>
                      </router-link>
                      <router-link to="/logout" class="item">
                        <i class="fa fa-sign-out"></i>
                        <span>Logout</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </slot>
      </div>
    </header>
  </teleport>
</template>
<script>
export default {
  name: "Wf1Header",
  data: ()=>({menu:false})
};
</script>