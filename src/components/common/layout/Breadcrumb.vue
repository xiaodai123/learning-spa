<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path" v-if="item.meta.title">
                <span v-if="item.redirect==='noredirect' || index===breadcrumbList.length-1" class="np-redirect">{{item.meta.title}}</span>
                <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>
<script>
import Vue from 'vue';
import { Breadcrumb, BreadcrumbItem } from 'element-ui';
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
export default {
    created() {
        this.getBreadcrumb()
    },
    data() {
        return {
            breadcrumbList: null
        }
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name);
            const first = matched[0];
            if(first && first.name !== '首页') {
                matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched);
            }
            this.breadcrumbList = matched;
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
}
</script>
<style lang="sass">
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
    /*breadcrumb transition*/
    .breadcrumb-enter-active,
    .breadcrumb-leave-active {
        transition: all .5s ease;
    }

    .breadcrumb-enter,
    .breadcrumb-leave-to {
        opacity: 0;
        transform: translateX(20px);
    }

    .breadcrumb-move {
        transition: all .5s ease;
    }

    .breadcrumb-leave-active {
        position: absolute;
    }
}
</style>


