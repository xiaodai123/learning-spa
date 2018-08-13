const auth = {
    namespaced: true,
    state: {
        token: '1234321',
        uerInfo: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUserInfo(state, userInfo) {
            // Object.keys(userInfo).forEach(key => {
            //     state.userInfo[key] = userInfo[key];
            // })
            state.userInfo = userInfo;
        }
    },
    action: {
        setToken({ commit }) {
            commit('setToken');
        }
    }
}
export default auth;