import btnload from './btnload'

export default {
    install: (app, options) => {
        app.directive('btnload',btnload)
    }
}