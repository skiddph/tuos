<template>
  <div>
    <h1>Home sweet home</h1>
    <router-link to="/logout">Logout</router-link>
  </div>
</template>
<script>
export default {
  async created(){
    const me = await this.$tuos.auth.userMe()
    console.log(me)
  }
}
</script>