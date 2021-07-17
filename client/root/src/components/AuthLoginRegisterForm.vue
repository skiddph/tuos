<template>
  <div class="p-auth">
    <h1>{{ title }}</h1>
    <form @submit.prevent="submit">
      <div class="prompts" v-if="res && res.type">
        <div :type="res.type" :class="prompt?'':'out'" >
          <div>{{res.message}}</div>
          <i class="fa fa-times-circle" @click="prompt = false" aria-hidden="true"></i>
        </div>
      </div>
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
    title: String,
    res: Object,
  },
  data: () => ({
    xdata: {
      type: "",
      message: "",
    },
    prompt: false,
  }),
  methods: {
    submit(f) {
      const data = {};
      const fr = f.srcElement.getElementsByTagName("input");
      for (let i = 0; i < fr.length; i++) {
        if (fr[i].type != "submit") {
          const key = fr[i].name;
          const val = fr[i].value;
          data[key] = val;
        }
      }
      this.prompt = false;
      this.$emit("onSubmit", data);
    },
    resHandler(res) {
      this.xdata = res;
      this.prompt = true;
      window.scrollTo({top: 0, behavior: 'smooth'});
    },
  },
  watch: {
    res: {
      handler: "resHandler",
      immediate: true,
    },
  },
};
</script>