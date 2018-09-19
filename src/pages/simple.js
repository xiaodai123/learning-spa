// require('~compCss/simple');

import Vue from 'vue';
import store from '../store';
import i18n from './../i18n';
import simpleRouterMap from '../router/simple';
import configRouter from '~compJs/permission';
import './../mock';
import Layout from '~comp/common/layout/Layout';

const router = configRouter(store, simpleRouterMap);

let simple = new Vue({
    el: '#simple',
    data: {

    },
    components: {
        Layout 
    },
    router,
    store,
    i18n
});
