const auth = {
    namespaced: true,
    state: {
        token: '',
        userInfo: {},
        roles: []
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        SET_ROLES(state, roles) {
            state.roles = roles;
        }
    },
    actions: {
        setToken({commit}, token) {
            commit('SET_TOKEN', token);
        },
        setUserInfo({commit}, userInfo) {
            commit('SET_USERINFO', userInfo);
        },
        setRoles({commit}, roles) {
            commit('SET_ROLES', roles);
        }
    }
}
export default auth;