<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu 
            mode="vertical"
            :show-timeout="200"
            default-active="aaa"
            :collapse="isCollapse"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409eff">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item index="aaa">3</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">2</el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
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
    }
}
</script>
