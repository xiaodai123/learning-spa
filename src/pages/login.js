require('../assets/icon/iconfont.css');
require('../assets/css/login');

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import routes from '../router';
import { Input, Button, FormItem, Form, Row, Col } from 'element-ui';

Vue.use(VueRouter);
Vue.use(Input);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Row);
Vue.use(Col);
let router = new VueRouter({
    routes
})

let login = new Vue({
    el: '#login',
    data: {
        loginFrom: {
            userName: '',
            password: ''
        }
    },
    methods: {

    },
    router,
    store
})
