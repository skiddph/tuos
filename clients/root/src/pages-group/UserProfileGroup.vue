<template>
    <wf1-sidebar v-if="curUserDataState == 'success'">
        <wf1-sidebar-item :to="`/user/@${$router.currentRoute.value.params.user}/about`" icon="fa fa-user-circle" name="About"/>
    </wf1-sidebar>
    <wf1-main>
        <router-view v-if="curUserDataState == 'success'" />
        <skeleton-loader v-if="curUserDataState == 'fetching'" height="300px" />
        <div class="c-user-profile-group-error" v-if="curUserDataState == 'error'">
            <i class="fa fa-user"></i>
            <span>Can't find User Information <i class="fa fa-search"></i></span>
            <button @click="fetchCurUserData">Retry <i class="fa fa-refresh"></i></button>
        </div>
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