import header from './wf1-header.vue';
import container from './wf1-content.vue';
import sidebarItem from './wf1-sidebar-item.vue';
import sidebar from './wf1-sidebar.vue';
import main from './wf1-main.vue';
import wf1 from './wf1.vue';

export default {
    install: (app) => {
        app.component('wf1-header',header)
        app.component('wf1-container',container)
        app.component('wf1-sidebar-item',sidebarItem)
        app.component('wf1-sidebar',sidebar)
        app.component('wf1-main',main)
        app.component('wf1',wf1)
    }    
}