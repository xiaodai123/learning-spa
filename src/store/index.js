import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import getters from './getters';
import publics from './modules/publics';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {

    },
    getters,
    modules: {
        publics,
        auth
    }
})
export default store;