<template>
    <dialog v-if="dialog" class="dialog-container">
        <div class="dialog">
            <slot name="header">
                <div class="header">
                    <span>{{title}}</span>
                    <i class="fa fa-times" @click="closeDialog"></i>
                </div>
            </slot>
            <slot>
                <div class="body">{{message}}</div>
            </slot>
        </div>
    </dialog>
</template>
<style lang="scss" scoped>
    .dialog-container {
        @apply flex fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 items-center justify-center;

        .dialog {
            @apply bg-white rounded overflow-hidden;
            min-width: 250px;
            max-width: 55%;

            .header {
                @apply flex justify-between items-center pl-4 pr-2 pt-2 pb-1 border-b border-gray-100 bg-gray-50;

                span {
                    @apply font-semibold text-gray-900;
                }

                i {
                    @apply cursor-pointer text-gray-700 hover:text-gray-900 transition px-2 py-1 rounded;
                }
            }

            .body {
                @apply p-4;
            }
        }
    }
</style>
<script>
export default {
    props: {
        ConfirmText: {
            type: String,
            default: 'Confirm'
        },
        CancelText: {
            type: String,
            default: 'Cancel'
        },
        title: {
            type: String,
            default: "Confirm"
        },
        message: {
            type: String,
            default: "Are you sure?"
        }
    },
    data: () => ({
        dialog: true
    }),
    methods: {
        closeDialog() {
            this.$emit('onClose');
            this.dialog = false
        },
    }
}
</script>