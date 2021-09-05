<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  methods: {
    async onAuthStateChanged(authenticated) {
      if (authenticated) {
        await this.fetchUserData();
      }
    },
  },
};
</script>