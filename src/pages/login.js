require('../assets/icon/iconfont.css');
require('../assets/css/login');

import Vue from 'vue';
import i18n from './../i18n';
import store from '../store';
import { Input, Button, FormItem, Form, Row, Col } from 'element-ui';
// import $v from '../assets/js/ajax';
import { token, validate } from '../assets/js/util';
import LangSelect from '~comp/common/LangSelect';

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
            userName: 'daizhi',
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
        toLogin() {
            let xToken = '123456';
            token.setToken(xToken);
            window.location.href = 'test.html';
            // $v.post('', this.loginFrom, data => {
                
            // }, error => {

            // });
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                        this.loading = false
                        this.$router.push({ path: '/' })
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
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
        },
    },
    i18n,
    store
})
