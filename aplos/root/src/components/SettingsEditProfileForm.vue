<template>
  <base-form v-if="userdataState == 'success'" @onSubmit="check" :res="serv">
    <label>Name</label>
    <input type="text" name="name" v-model="data.name" :disabled="loading" />
    <label>Username</label>
    <input type="text" name="user" v-model="data.user" :disabled="loading" />
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
    isComponentLoading: true,
    loading: false,
    odata: {},
    data: {
      name: "",
      user: "",
    },
    serv: {
      type: "success",
      message: "successs sdf sfsdf",
    },
  }),
  computed: {
    ...mapState(['userdata','userdataState'])
  },
  methods: {
    check(e) {
      console.log('submitting for update prepro >>', e)
      e =  this.$tuos.auth.filterUpdateData(this.odata, e)
      console.log('submitting for update', e)
      this.loading = true
      this.$tuos.auth.update(e)
        .then(e => {
          this.serv = e
          console.log(e)
        })
        .catch(e => {
          this.serv = e
        })
        .finally(() => {
          this.loading = false
        })
    },
    userdataHandler(user){
      this.odata = user
      this.data.user = user.user
      this.data.name = user.name
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