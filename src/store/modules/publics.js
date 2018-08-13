import Cookies from 'js-cookie';

const publics = {
    namespaced: true,
    state: {
        language: Cookies.get('lang') || 'zh_CN'
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            Cookies.set('lang', language);
        }
    },
    actions: {
        setLanguage({ commit }, language) {
            commit('SET_LANGUAGE', language);
        }
    }
}
export default publics