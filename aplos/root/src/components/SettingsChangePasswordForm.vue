<template>
  <base-form v-if="userdataState == 'success'" @onSubmit="check" :res="serv">
    <label>New Password</label>
    <input type="password" name="npass" :disabled="loading" />
    <label>Confirm New Password</label>
    <input type="password" name="cnpass" :disabled="loading" />
    <server-response-handler :res="serv" />
    <button
      type="submit"
      value="SAVE"
      v-btnload="loading"
    />
  </base-form>
  <userdata-skeleton-loader extend-class="auto-container" />
</template>
<script>
import {mapState} from 'vuex'
import BaseForm from './SettingsUpdateProfileBaseForm.vue'
export default {
  name: "SettingsEditProfileForm",
  components: {
    BaseForm,
  },
  data: () => ({
    loading: false,
    serv: {
      type: "",
      message: "",
    },
  }),
  computed: {
    ...mapState(['userdata','userdataState'])
  },
  methods: {
    check(e) {
      if((e.npass != e.cnpass) || e.npass.length < 6){
        this.serv = {
          type: "error",
          message: "Invalid"
        }
        return;
      }
      e =  this.$tuos.auth.filterUpdatePasswordData(e)
      this.loading = true
      this.$tuos.auth.update(e)
        .then(e => {
          this.serv = e
        })
        .catch(e => {
          this.serv = e
        })
        .finally(async () => {
          this.loading = false
        })
    },
  },
};
</script>