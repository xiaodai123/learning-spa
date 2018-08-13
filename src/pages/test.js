require('../assets/css/test');
require('../assets/css/testscss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import i18n from './../i18n';
import routes from '../router/index';
import test1 from '~compJs/async1';
import { mapState } from 'vuex';

Vue.use(VueRouter);
// 创建路由
const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('x-token')) {
        if (!store.getters['auth/getUserInfo']) {
            let userInfo = {
                userName: 'daizhi',
                password: '123123'
            };
            store.commit('auth/setUserInfo', userInfo);
        }
        next();
    } else {
        next(false);
        window.location.href = 'login.html';
    }
})

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
            token1: state => state.auth.token,
            userInfo: state => state.auth.userInfo
        })
    },
    mounted() {
        this.name = 'firstTest';
    },
    router,
    store,
    i18n
});
