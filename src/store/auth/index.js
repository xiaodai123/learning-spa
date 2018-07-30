const auth = {
    namespaced: true,
    state: {
        token: '1234321'
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        }
    },
    // 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    getters: {
        token1(state) {
            return state.token;
        }
    },
    action: {
        setToken({ commit }) {
            commit('setToken');
        }
    }
}
export default auth;