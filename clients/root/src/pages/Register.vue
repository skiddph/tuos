<template>
  <auth-form title="Register" @onSubmit="authFormRegister" :res="serv">
    <template #form>
      <div>
        <label>Name</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Username</label>
        <input type="text" name="user" required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" required />
      </div>

      <div>
        <label>Phone</label>
        <input type="tel" name="phone" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="pass" autocomplete required />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" name="cpass" autocomplete required />
      </div>
      <div>
        <button type="submit" v-btnload="loading" value="Create Account" />
      </div>
    </template>
    <template #notes>
      <p>
        By creating an account, you agree to our
        <router-link to="/">Terms and Agreements</router-link>
      </p>
      <p>
        Already have an account? <router-link to="/login">Login</router-link>
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
    serv: {
      type: "",
      message: "",
    },
  }),
  methods: {
    onAuthStateChanged(auth) {
      if (auth) {
        this.$router.push("/home");
      }
    },
  },
};
</script>