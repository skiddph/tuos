<template>
  <confirm-dialog
    title="Logout"
    message="Are you sure you want to logout?"
    @onConfirm="logoutBtn"
    @onClose="cancelBtn"
    @onCancel="cancelBtn"
  />
</template>
<script>
export default {
  methods: {
    logoutBtn() {
      this.resetStore();
      this.$router.push("/");
    },
    cancelBtn() {
      this.$router.go(-1);
    },
  },
};
</script>