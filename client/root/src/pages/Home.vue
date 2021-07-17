<template>
  <div class="p-auth">
    <h1>Tuos Login</h1>
    <form action="">
      <input
        type="text"
        placeholder="Username"
        name="user"
        autocomplete="off"
      />
      <input
        type="password"
        placeholder="Password"
        name="pass"
        autocomplete="off"
      />
      <input type="submit" value="Authenticate" />
    </form>
  </div>
</template>

<script>
import "../styles/auth.scss";
export default {};
</script>