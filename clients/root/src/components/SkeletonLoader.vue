<template>
    <div :class="`skeleton-loader${c ? ' skeleton-container': ''} ${extendClass}`">
        <div class="top">
            <div v-if="h" class="h"></div>
            <div v-if="sh" class="sh"></div>
        </div>
        <div v-if="b" class="body" :style="`height:${height}`">
        </div>
    </div>
</template>
<script>
export default {
    name: "SkeletonLoader",
    props: {
        extendClass: {
            type: String,
            default: ""
        },
        height: {
            type:String,
            default: "5em"
        }
    },
    data: ()=>({
        h: true,
        sh: true,
        c: true,
        b: true
    })
}
</script>