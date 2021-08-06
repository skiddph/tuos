<template>
  <form class="form-container">
    <div class="inputs-container">
      <label>Email</label>
      <input
        type="email"
        name="email"
        v-model="data.email"
        :disabled="loading"
      />
      <label>Phone</label>
      <input
        type="text"
        name="phone"
        v-model="data.phone"
        :disabled="loading"
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
  name: "SettingsAccBindingsForm",
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