require('../assets/css/test');
require('../assets/css/testscss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import i18n from './../i18n';
import constantRouterMap from '../router/index';
import test1 from '~compJs/async1';
import { token } from '~compJs/util';
import $v from '~compJs/ajax';
import './../mock';
import { mapGetters } from 'vuex';

Vue.use(VueRouter);
// 创建路由
const router = new VueRouter({
    routes: constantRouterMap
});

router.beforeEach((to, from, next) => {
    let tokenTemp = token.getToken('x-token');
    if (tokenTemp) {
        $v.get('/cq-ocms/user/info', {token: tokenTemp}, data => {
            let userInfo = data.data;
            store.dispatch('auth/setUserInfo', userInfo);
            store.dispatch('auth/setToken', tokenTemp);
            if (from === '/') {
                next(false);
                window.location.href = 'simple.html';
            } else {
                next();
            }
        }, error => {
            console.log(error);
            next(false);
            window.location.href = 'login.html';
        });
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
        // ...mapState({
        //     userInfo: state => state.auth.userInfo
        // })getUserInfo
        ...mapGetters({
            userInfo: 'getUserInfo',
            token: 'token'
        })
    },
    mounted() {
        this.name = 'firstTest';
    },
    router,
    store,
    i18n
});
