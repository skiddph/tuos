<template>
  <base-form @onSubmit="check">
    <label>Name</label>
    <input type="text" name="name" v-model="data.name" :disabled="loading" />
    <label>Username</label>
    <input type="text" name="user" v-model="data.user" :disabled="loading" />
    <button
      type="submit"
      value="SAVE"
      v-btnload="loading"
    />
  </base-form>
</template>
<script>
import BaseForm from './SettingsUpdateProfileBaseForm.vue'
export default {
  name: "SettingsEditProfileForm",
  components: {
    BaseForm
  },
  data: () => ({
    isComponentLoading: true,
    loading: false,
    odata: {
      name: "",
      user: "",
    },
    data: {
      name: "",
      user: "",
      pass: "",
    },
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
  methods: {
    check(e) {
      console.log('data',e)
      this.loading = false
    }
  }
};
</script>