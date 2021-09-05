import ConfirmDialog from './ConfirmDialog.vue'
import SkeletonLoader from './SkeletonLoader.vue'
import UserdataSkeletonLoader from './UserdataSkeletonLoader.vue'
import ServerResponseHandler from './ServerResponseHandler.vue'
export default {
    install: (app) => {
        app.component('confirm-dialog',ConfirmDialog)
        app.component('skeleton-loader',SkeletonLoader)
        app.component('userdata-skeleton-loader',UserdataSkeletonLoader)
        app.component('server-response-handler',ServerResponseHandler)
    }    
}