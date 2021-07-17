<template>
  <auth-form title="Register" @onSubmit="register">
    <template #form>
      <input type="text" name="name" placeholder="Name">
      <input type="text" name="user" placeholder="Username">
      <input type="email" name="email" placeholder="Email">
      <input type="password" name="pass" placeholder="Password" autocomplete>
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
  data: () =>({
    loading: false
  }),
  methods: {
    register (data) {
      console.log(data)
    }
  }
}
</script>