<template>
  <form class="form-container">
    <div class="inputs-container">
      <label>New Password</label>
      <input
        type="password"
        name="pass"
        v-model="data.pass"
        :disabled="loading"
        autocomplete
      />
      <label>Confirm New Password</label>
      <input
        type="password"
        name="cpass"
        v-model="data.cpass"
        :disabled="loading"
        autocomplete
      />
      <button
        type="submit"
        @click="loading = !loading"
        v-btnload="loading"
        value="SAVE"
      />
    </div>
  </form>
</template>
<script>
export default {
  name: "SettingsChangePasswordForm",
  data: () => ({
    isComponentLoading: true,
    loading: false,
    odata: {
      name: "",
      user: "",
      email: "",
      phone: "",
    },
    data: {
      name: "",
      user: "",
      email: "",
      phone: "",
      pass: "",
      cpass: "",
    },
    opass: "",
    serv: {
      type: "",
      message: "",
    },
  }),
  async created() {
    this.odata = await this.$tuos.auth.userMe();
    console.log(this.odata);
    this.data = this.odata;
  },
};
</script>