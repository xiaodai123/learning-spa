const routes = [
    // 从 vue-loader@13.0.0，不能用 require 来引入 .vue 文件，因为 .vue 文件最终会被编译成 ES6 module。
    // {
    //     path: '/index',
    //     component: (resolve) => {
    //         require([], () => {
    //             resolve(require('~comp/index'));
    //         }, 'index');
    //     }
    // },
    {
        path: '/index',
        name: '测试',
        meta: { role: ['admin'] },
        component: () => import ( /* webpackChunkName: "index" */ '~comp/index')
    },
    {
        path: '/401',
        component: () => import ( /* webpackChunkName: "401" */ '~comp/common/errorPage/401'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import ( /* webpackChunkName: "401" */ '~comp/common/errorPage/404'),
        hidden: true
    }
]


export default routes;
