require('../assets/icon/iconfont.css');
require('../assets/css/login');

import Vue from 'vue';
import i18n from './../i18n';
import store from '../store';
import './../mock';
import { Input, Button, FormItem, Form, Row, Col } from 'element-ui';
import $v from '~compJs/ajax';
import { token, validate } from '~compJs/util';
import { TO_URL } from '~compJs/public';
import LangSelect from '~comp/common/LangSelect';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
    routes: []
})

router.beforeEach((to, from, next) => {
    let tokenTemp = token.getToken('x-token');
    if (tokenTemp) {
        window.location.href = 'simple.html';
    } else {
        next();
    }
})

Vue.use(Input);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Row);
Vue.use(Col);
const checkPassword = (rule, value, callback) => {
    if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
    } else {
        callback();
    }
}
const checkUserName = (rule, value, callback) => {
    if (!validate.isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'));
    } else {
        callback();
    }
}
let login = new Vue({
    el: '#login',
    data: {
        loginFrom: {
            userName: 'admin',
            password: '111111'
        },
        passwordType: 'password',
        loginRules: {
            password: [{ required: true, trigger: 'blur', validator: checkPassword }],
            userName: [{ required: true, trigger: 'blur', validator: checkUserName }]
        },
        loading: false
    },
    mounted() {
    },
    components: {
        LangSelect
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    $v.post(TO_URL + '/login', this.loginFrom, data => {
                        token.setToken(data.data.token);
                        this.loading = false;
                        window.location.href = 'simple.html';
                    }, error => {
                        console.log(error);
                        this.loading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false
                }
            })
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
        }
    },
    i18n,
    store,
    router
})
