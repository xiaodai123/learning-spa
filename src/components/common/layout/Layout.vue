<template>
    <div data-layout-box>
        <Sidebar class="sidebar-container"></Sidebar>
        <div class="main-container">
        </div>
    </div>
</template>
<script>
import Sidebar from './Sidebar';
export default {
    components: {
        Sidebar
    }
}
</script>
<style lang="sass">
div[data-layout-box] {
    display: fixe;
    .sidebar-container {
        transition: width 0.28s;
        width: 200px !important;
        height: 100%;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }
    .main-container{
        min-height: 100%;
        transition: margin-left .28s;
        flex: 1;
        width: 100%;
    }
}
</style>


