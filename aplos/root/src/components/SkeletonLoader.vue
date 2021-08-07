<template>
    <div :class="`skeleton-loader${c ? ' skeleton-container': ''} ${extendClass}`">
        <div class="top">
            <div v-if="h" class="h"></div>
            <div v-if="sh" class="sh"></div>
        </div>
        <div v-if="b" class="body">
        </div>
    </div>
</template>
<style lang="scss">
    .skeleton-loader {
        @apply w-full rounded p-2 flex flex-col;
        min-height: 1em;

        &.skeleton-container {
            @apply bg-gray-100;
        }

        .top {
            @apply  flex flex-col;

            .h {
                @apply bg-gray-400 mb-1 rounded-xl;
                width: 40%;
                height: 1em;
            }

            .sh {
                @apply bg-gray-200 mb-2 rounded-xl;
                height: .6em;
                width: 50%;
            }
        }
        .body {
            @apply bg-gray-300 mt-1 rounded-xl;
            height: 5em;
        }
    }
</style>
<script>
export default {
    name: "SkeletonLoader",
    props: {
        extendClass: {
            type: String,
            default: ""
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