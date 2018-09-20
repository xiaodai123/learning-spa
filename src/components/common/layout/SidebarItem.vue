<template>
    <div data-sidebar-item v-if="!item.hidden&&item.children">
        <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children && !item.alwaysShow" :to="resolvePath(onlyOneChild.path)">
            <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':isNest}">
                <FontIcon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :icon="onlyOneChild.meta.icon"/>
                <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
            </el-menu-item>
        </router-link>
        <el-submenu :show-timeout="200" v-else :index="item.name||item.path">
            <template slot="title">
                <FontIcon v-if="item.meta && item.meta.icon" :icon="item.meta.icon"/>
                <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
            </template>
            <template v-for="child in item.children" v-if="!child.hidden">
                <SidebarItem :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></SidebarItem>
                <router-link :to="resolvePath(child.path)" :key="child.name">
                    <el-menu-item :index="resolvePath(child.path)">
                        <FontIcon v-if="child.meta && child.meta.icon" :icon="child.meta.icon"/>
                        <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
                    </el-menu-item>
                </router-link>
            </template>
        </el-submenu>
    </div>
</template>
<script>
import path from 'path';
import Vue from 'vue';
import FontIcon from '~comp/common/FontIcon';
import SidebarItem from './SidebarItem';
import { MenuItem, Submenu, Tooltip } from 'element-ui';
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Tooltip);
export default {
    name: 'SidebarItem',
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            onlyOneChild: null
        }
    },
    components: {
        FontIcon,
        SidebarItem
    },
    methods: {
        hasOneShowingChild(children) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false;
                } else {
                    this.onlyOneChild = item;
                    return true;
                }
            })
            if (showingChildren.length === 1) {
                return true;
            }
            return false;
        },
        resolvePath(...paths) {
            return path.resolve(this.basePath, ...paths);
        }
    }
}
</script>
<style lang="sass">
div[data-sidebar-item] {
    .submenu-title-noDropdown {
        padding-left: 10px !important;
        position: relative;
        .el-tooltip {
            padding: 0 10px !important;
        }
    }
}
</style>

