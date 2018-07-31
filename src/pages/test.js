require('../assets/css/test');
require('../assets/css/testscss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import routes from '../router/index';
import test1 from '~compJs/async1';
import { mapState } from 'vuex';

Vue.use(VueRouter);
// 创建路由
const router = new VueRouter({
    routes
});

let vm = new Vue({
    el: '#vm',
    data: {
        name: ''
    },
    methods: {
        test() {
            console.log('123123');
            test1();
        }
    },
    computed: {
        token () {
            return store.state.auth.token;
        },
        ...mapState({
            token1: state => state.auth.token
        })
    },
    mounted() {
        this.name = 'firstTest';
    },
    router,
    store
});
