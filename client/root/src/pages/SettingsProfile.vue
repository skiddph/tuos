<template>
  <div class="p-settings-profile">
    <basic-info />
  </div>
</template>
<script>
import "../styles/p-settings-profile.scss";
import BasicInfo from '../components/EditSettingsProfileBUI.vue';
export default {
    components: {
        BasicInfo
    }
};
</script>