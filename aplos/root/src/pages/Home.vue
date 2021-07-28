<template>
  <div class="p-home">
    <div class="sidebar">
      <router-link to="/home">
        <i class="fa fa-home"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/settings">
      <i class="fa fa-cog"></i>
        <span>Settings</span>
      </router-link>
    </div>
    <!-- <div class="sidebar-shadow"></div> -->
    <div class="main-activity">
      <h1>Home sweet home</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nesciunt iure suscipit cupiditate magni voluptatibus quod ab quisquam impedit adipisci esse laboriosam, error vel cumque est earum officia quae. Eius repellat eum, nesciunt magni, eos quia reiciendis, a praesentium hic ab exercitationem deserunt minima repudiandae consequuntur vero error. Totam at, culpa, dolorem ab distinctio porro animi, voluptate quo id molestias inventore ratione? Accusantium esse cum, aperiam animi maiores excepturi enim. Laboriosam placeat voluptas tempore facilis rem veritatis sequi quae possimus.</p>
    </div>
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