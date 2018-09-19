import routes from '../../router';
import VueRouter from 'vue-router';
import Vue from 'vue';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { token } from '~compJs/util';
import { TO_URL } from '~compJs/public';
import $v from '~compJs/ajax';

NProgress.configure({ showSpinner: false });

// function hasPermission(roles, permissionRoles) {
//     if (roles.indexOf('admin') >= 0) return true;
//     if (!permissionRoles) return true;
//     return roles.some(role => permissionRoles.indexOf(role) >= 0);
// }
// const whiteList = ['/login', '/authredirect'];

Vue.use(VueRouter);

// 创建路由
const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes
})

function configRouter(store, asyncRouterMap) {
    router.beforeEach((to, from, next) => {
        NProgress.start();// start progress bar
        let tokenTemp = token.getToken('x-token');
        if (tokenTemp) {
            if (store.getters.roles.length === 0) {
                $v.get(TO_URL + '/user/info', {token: tokenTemp}, data => {
                    let userInfo = data.data;
                    store.dispatch('auth/setUserInfo', userInfo);
                    store.dispatch('auth/setToken', tokenTemp);
                    let roles = userInfo.roles;
                    if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        store.dispatch('auth/setRoles', userInfo.roles);
                    } else {
                        Message.error({message: 'getInfo: roles must be a non-null array !'});
                    }
                    // 根据roles权限生成可访问的路由表
                    store.dispatch('permission/generateRoutes', { roles, asyncRouterMap }).then(() => {
                        // 动态添加可访问路由表
                        router.addRoutes(store.getters.addRouters);
                        // hack方法 确保addRoutes已完成 ,set the replace: true so the navugation will not leave a history record
                        next({ ...to, replace: true });
                    });

                    // if (from.path === '/') {
                    //     next(false);
                    //     NProgress.done();
                    //     window.location.href = whichHtml;// 'simple.html';
                    // }
                }, error => {
                    Message.error({message: error});
                    next(false);
                    NProgress.done();
                    window.location.href = 'login.html';
                });
                next();
            } else {
                // 有角色权限时
                next();
            }
        } else {
            next(false);
            NProgress.done();
            window.location.href = 'login.html';
        }
    });
    router.afterEach(() => {
        NProgress.done();// finish progress bar
    });
    return router;
}

export default configRouter;
