<template>
    <wf1-sidebar>
        <wf1-sidebar-item to="/settings" icon="fa fa-user" name="Edit Profile"/>
        <wf1-sidebar-item to="/home" icon="fa fa-home" name="Home"/>
    </wf1-sidebar>
    <wf1-main>
        <router-view />
    </wf1-main>
</template>