import ConfirmDialog from './ConfirmDialog.vue'
export default {
    install: (app) => {
        app.component('confirm-dialog',ConfirmDialog)
    }    
}