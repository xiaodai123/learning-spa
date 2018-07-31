const auth = {
    namespaced: true,
    state: {
        token: '1234321',
        uerInfo: {}
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
    // 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    getters: {
        token1(state) {
            return state.token;
        },
        getUserInfo(state) {
            return state.uerInfo;
        }
    },
    action: {
        setToken({ commit }) {
            commit('setToken');
        }
    }
}
export default auth;