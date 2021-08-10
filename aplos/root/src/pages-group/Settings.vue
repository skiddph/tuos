<template>
    <wf1-sidebar>
        <wf1-sidebar-item to="/settings" icon="fa fa-user-circle" name="Profile"/>
        <wf1-sidebar-item to="/settings/bindings" icon="fa fa-chain" name="Bindings" />
        <wf1-sidebar-item to="/settings/password" icon="fa fa-key" name="Password" />
    </wf1-sidebar>
    <wf1-main>
        <router-view />
    </wf1-main>
</template>
<script>
export default {
    methods: {
        async onAuthStateChanged(authenticated){
            if(!authenticated) {
                this.$router.push('/')
            }
        }
    },
}
</script>