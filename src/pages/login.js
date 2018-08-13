require('../assets/icon/iconfont.css');
require('../assets/css/login');

import Vue from 'vue';
import i18n from './../i18n';
import store from '../store';
import { Input, Button, FormItem, Form, Row, Col } from 'element-ui';
// import $v from '../assets/js/ajax';
import { token } from '../assets/js/util';
import LangSelect from '~comp/common/LangSelect';

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
            userName: 'daizhi',
            password: '111111'
        }
    },
    mounted() {
    },
    components: {
        LangSelect
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
    i18n,
    store
})
