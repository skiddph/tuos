<template>
    <wf1-sidebar v-if="curUserDataState == 'success'">
        <wf1-sidebar-item :to="`/user/@${$router.currentRoute.value.params.user}/about`" icon="fa fa-user-circle" name="About"/>
    </wf1-sidebar>
    <wf1-main>
        <router-view v-if="curUserDataState == 'success'" />
        <skeleton-loader v-if="curUserDataState == 'fetching'" height="300px" />
    </wf1-main>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:"UserProfileGroup",
    async created(){
        await this.fetchCurUserData()
    },
    computed: {
        ...mapState(['curUserDataState'])
    }
}
</script>