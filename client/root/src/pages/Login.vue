<template>
  <auth-form title="Login" @onSubmit="login">
    <template #form>
      <input type="text" placeholder="Username" name="user" autocomplete required />
      <input type="password" placeholder="Password" name="pass" autocomplete required/>
      <button type="submit" v-btnload="loading" value="Authenticate" />
    </template>
    <template #notes>
      <p>
        By logging in, you agree to our
        <router-link to="/">Terms and Agreements</router-link>
      </p>
      <p>
        Do not have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </template>
  </auth-form>
</template>
<script>
import AuthForm from "../components/AuthLoginRegisterForm.vue";
export default {
  components: {
    AuthForm,
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    async login(data) {
      this.loading = true;
      await this.$tuos.auth
        .login(data)
        .then((e) => console.log(e))
        .catch((e) => console.warn(e))
        .finally(() => (this.loading = false));
    },
  },
};
</script>