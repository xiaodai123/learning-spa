require('../assets/icon/iconfont.css');
require('~compCss/index');

import Vue from 'vue';
import store from '../store';
import i18n from './../i18n';
import simpleRouterMap from '../router/simple';
import configRouter from '~compJs/permission';
import './../mock';

const router = configRouter(store, simpleRouterMap);

let simple = new Vue({
    el: '#simple',
    data: {

    },
    router,
    store,
    i18n
});
