<template>
  <form class="form-container" @submit.prevent="dialog = true" :id="`cd-${formID}`">
    <custom-dialog v-if="dialog" @onClose="dialog = false" title="Checkpoint">
      <div class="c-retype-pass">
        <div class="message">
          You must re-enter your current password to proceed.
        </div>
        <div class="diag-form">
          <label>Current Password</label>
          <input type="password" name="pass" v-model="pass" />
          <button type="submit" v-btnload="loading" value="Submit" @click="submit" />
        </div>
      </div>
    </custom-dialog>
    <div class="inputs-container">
      <slot />
    </div>
  </form>
</template>
<script>
import CustomDialog from "./CustomDialog.vue";
export default {
  name: "SettingsUpdateProfileBaseForm",
  components: {
    CustomDialog,
  },
  props: {
    loading: Boolean
  },
  created(){
    this.formID = Date.now();
  },
  data: ()=>({
    formID: "",
    pass: "",
    dialog: false
  }),
  methods: {
    submit(f) {
      const data = {};
      const getInputs = () => document.querySelector("#cd-" + this.formID).querySelectorAll("input")
      const fr = getInputs();
      this.dialog = false;
      for (let i = 0; i < fr.length; i++) {
        if (fr[i].type != "submit") {
          const key = fr[i].name;
          const val = fr[i].value;
          data[key] = val;
        }
      }
      this.$emit("onSubmit", data);
    },
  },
};
</script>