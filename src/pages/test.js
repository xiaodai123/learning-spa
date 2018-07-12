require('../assets/css/test');
require('../assets/css/testscss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

import routes from '../router/index';
import test1 from '../assets/js/async1';
//创建路由
const router = new VueRouter({
    routes
});

let vm = new Vue({
    el: '#vm',
    data: {
        name: '',
    },
    methods: {
        test(){
            console.log(`123123`);
            new Promise((reject,resolve) => {
                test1();
            });
            $(".div3").html('22222')
            // test1();
        }
    },
    mounted() {
        this.name = 'firstTest';
    },
    router,
}) 
