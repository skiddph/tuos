<template>
    <dialog v-if="dialog" class="c-confirm-dialog-container">
        <div class="dialog">
            <div class="title">
                <span>{{title}}</span>
                <button  @click="cancelDialog">x</button>
            </div>
            <div class="message">
                {{message}}
            </div>
            <div class="actions">
                <button @click="cancelDialog">{{CancelText}}</button>
                <button @click="confirmDialog">{{ConfirmText}}</button>
            </div>
        </div>
    </dialog>
</template>
<script>
import '../styles/c-confirm-dialog.scss'
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
        cancelDialog() {
            this.$emit('onCancel');
            this.dialog = false
        },
        confirmDialog() {
            this.$emit('onConfirm');
            this.dialog = false
        }
    }
}
</script>