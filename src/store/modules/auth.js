const auth = {
    namespaced: true,
    state: {
        token: '',
        userInfo: {}
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        setToken({commit}, token) {
            commit('setToken', token);
        }
    }
}
export default auth;