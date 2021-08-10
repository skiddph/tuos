<template>
  <div>
    <div class="title">About Profile</div>
    <user-about-card extend-class="auto-container" />
  </div>
</template>
<script>
import UserAboutCard from '../components/UserAboutCard.vue'
export default {
  components: {
    UserAboutCard
  }
}
</script>