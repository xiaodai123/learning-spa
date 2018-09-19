<template>
    <div data-sidebar-box>
        <el-scrollbar wrapClass="scrollbar-wrapper">
            <el-menu 
                mode="vertical"
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapse"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409eff">
                <SidebarItem v-for="(route, index) in permissionRouters" :key="index" :item="route" :base-path="route.path"></SidebarItem>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import { Scrollbar, Menu, Submenu, MenuItem } from 'element-ui';
Vue.use(Scrollbar);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
export default {
    computed: {
        ...mapGetters([
            'sidebar',
            'permissionRouters'
        ]),
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    components: {
        SidebarItem
    }
}
</script>
<style lang="sass">
div[data-sidebar-box] {
    //reset element-ui css
    .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }
    .scrollbar-wrapper {
        overflow-x: hidden!important;
        margin-bottom: 0px!important;
        .el-scrollbar__view {
            height: 100%;
        }
    }
    .is-horizontal {
      display: none;
    }
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }
}
.sidebar-container .nest-menu .el-submenu>.el-submenu__title,
.sidebar-container .el-submenu .el-menu-item {
    min-width: 180px !important;
    background-color: #1f2d3d !important;
    &:hover {
        background-color: #001528 !important;
    }
}
.el-menu--collapse .el-menu .el-submenu {
    min-width: 180px !important;
}
</style>


