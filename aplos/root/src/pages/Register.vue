<template>
  <auth-form title="Register" @onSubmit="authFormRegister" :res="serv">
    <template #form>
      <input type="text" name="name" placeholder="Name" required>
      <input type="text" name="user" placeholder="Username" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="tel" name="phone" placeholder="Phone" required>
      <input type="password" name="pass" placeholder="Password" autocomplete required>
      <input type="password" name="cpass" placeholder="Confirm Password" autocomplete required>
      <button type="submit" v-btnload="loading" value="Create Account"/>
    </template>
    <template #notes>
      <p>By creating an account, you agree to our <router-link to="/">Terms and Agreements</router-link></p>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </template>
  </auth-form>
</template>

<script>
import AuthForm from '../components/AuthLoginRegisterForm.vue'
export default {
  components: {
    AuthForm
  },
  data: () => ({
    loading: false,
    serv: {
      type: "",
      message: "",
    },
  }),
  methods: {
    onAuthStateChanged(auth){
      if(auth){
        this.$router.push("/home");
      }
    }
  }
}
</script>