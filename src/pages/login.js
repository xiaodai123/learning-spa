require('../assets/icon/iconfont.css');
require('../assets/css/login');

import Vue from 'vue';
import store from '../store';
import { Input, Button, FormItem, Form, Row, Col } from 'element-ui';
// import $v from '../assets/js/ajax';
import { token } from '../assets/js/util';

Vue.use(Input);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Row);
Vue.use(Col);

let login = new Vue({
    el: '#login',
    data: {
        loginFrom: {
            userName: '',
            password: ''
        },
        isShow: false
    },
    mounted() {
        this.isShow = true;
    },
    methods: {
        toLogin() {
            let xToken = '123456';
            token.setToken(xToken);
            window.location.href = 'test.html';
            // $v.post('', this.loginFrom, data => {
                
            // }, error => {

            // });
        }
    },
    store
})
