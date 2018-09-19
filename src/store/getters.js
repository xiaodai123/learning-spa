// 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
const getters = {
    token: state => state.auth.token,
    getUserInfo: state => state.auth.userInfo,
    language: state => state.publics.language,
    sidebar: state => state.publics.sidebar,
    permissionRouters: state => state.permission.routers,
    roles: state => state.auth.roles,
    addRouters: state => state.permission.addRouters
}
export default getters