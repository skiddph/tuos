<template>
    <skeleton-loader v-if="userdataState == 'fetching'" :extend-class="extendClass"/>
    <div v-if="userdataState == 'error'" :class="`${extendClass} fetch-userdata-btn`" @click="fetchUserData">
        <div class="btn">
            <i class="fa fa-refresh"></i>
            <span>Failed to get userdata!</span>
            <span>Click to fetch userdata again.</span>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:"UserdataSkeletonLoader",
    props: {
        extendClass: {
            extendClass: {
                type: String,
                default: ""
            }
        }
    },
    computed: {
        ...mapState(['userdataState'])
    }
}
</script>