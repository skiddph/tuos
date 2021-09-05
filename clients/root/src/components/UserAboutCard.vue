<template>
    <div :class="`c-user-about ${extendClass}`">
      <div class="row" v-for="(val,key) in $store.state.curUserData" :key="key">
        <div class="key">{{key.replace("_","")}}</div>
        <div class="value">{{val}}</div>
      </div>
    </div>
</template>
<script>
export default {
    name: "UserAboutCard",
    props: {
        extendClass: {
            type: String,
            default: ""
        }
    }
}
</script>