import ConfirmDialog from './ConfirmDialog.vue'
import SkeletonLoader from './SkeletonLoader.vue'
import UserdataSkeletonLoader from './UserdataSkeletonLoader.vue'
export default {
    install: (app) => {
        app.component('confirm-dialog',ConfirmDialog)
        app.component('skeleton-loader',SkeletonLoader)
        app.component('userdata-skeleton-loader',UserdataSkeletonLoader)
    }    
}