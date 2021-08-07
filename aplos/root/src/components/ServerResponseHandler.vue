<template>
    <div v-if="type" :class="`c-server-response-handler ${extendClass}`">
        <div :type="type" :class="`${prompt?'':'out'}`" >
            <div>{{message}}</div>
            <i class="fa fa-times-circle" @click="prompt = false" aria-hidden="true"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        res: Object,
        extendClass: {
            type: String,
            default: ""
        }
    },
    data: ()=>({
        message: "",
        type:"",
        prompt: true
    }),
    methods: {
        resHandler(res) {
            this.message = res.message
            this.type = res.type
            this.prompt = true;
            console.log('res updated')
        },
    },
    watch: {
        res: {
            handler: "resHandler",
            immediate: true,
        },
    }
}
</script>