<template>
  <base-form v-if="userdataState == 'success'" @onSubmit="check" :res="serv">
    <label>Email</label>
    <input type="email" name="email" v-model="data.email" :disabled="loading" />
    <label>Phone</label>
    <input type="tel" name="phone" v-model="data.phone" :disabled="loading" />
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
    odata: {},
    data: {
      email: "",
      phone: "",
    },
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
      e =  this.$tuos.auth.filterUpdateData(this.odata, e)
      this.loading = true
      this.$tuos.auth.update(e)
        .then(e => {
          this.serv = e
        })
        .catch(e => {
          this.serv = e
        })
        .finally(async () => {
          await this.fetchUserData()
          this.loading = false
        })
    },
    userdataHandler(user){
      this.odata = user
      this.data.email = user.email
      this.data.phone = user.phone
    }
  },
  watch: {
    userdata: {
      handler: 'userdataHandler',
      immediate: true
    }
  }
};
</script>