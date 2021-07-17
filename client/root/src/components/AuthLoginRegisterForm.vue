<template>
  <div class="p-auth">
    <h1>{{title}}</h1>
    <form @submit.prevent="submit">
      <slot name="form" />
    </form>
    <div class="notes">
        <slot name="notes" />
    </div>
  </div>
</template>

<script>
import "../styles/auth.scss";
export default {
  name: "AuthLoginRegisterForm",
  props: {
    title: {
      type: String,
    }
  },
  methods: {
    submit(f) {
      const data = {}
      const fr = f.srcElement.getElementsByTagName("input")
      for(let i = 0; i < fr.length; i++){
        if(fr[i].type != "submit"){
          const key = fr[i].name
          const val = fr[i].value
          data[key] = val
        }
      }

      this.$emit('onSubmit', data)
    }
  }
}
</script>