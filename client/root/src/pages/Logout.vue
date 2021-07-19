<template>
    <div>
        <h1>Logout</h1>
    </div>
</template>
<script>
export default {
    created(){
        this.resetStore()
        this.$router.push('/')
    }
}
</script>