<template>
    <div class="lo-user">
     <header>
         <ul class="brand__search">
             <li class="brand">Tuos</li>
             <li class="search">
                 <input type="text" placeholder="search">
             </li>
         </ul>
         <ul class="main__navi">
             <li>
                 <router-link to="/home">Home</router-link>
             </li>
         </ul>
         <ul class="option__tools">
             <li>
                 <router-link to="/settings">Settings</router-link>
             <router-link to="/logout">Logout</router-link>
             </li>
         </ul>
     </header>
    <div class="main">
      <slot />
    </div>
  </div>
</template>
<script>
import '../styles/lo-user.scss'
export default {
    name:"layoutUser"
}
</script>