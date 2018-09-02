import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import publics from './modules/publics';
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {

    },
    getters,
    modules: {
        publics,
        auth,
        permission
    }
})
export default store;