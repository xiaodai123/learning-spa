import Layout from './../components/common/layout/Layout';
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
        path: '',
        redirect: '/index',
        component: Layout,
        meta: { role: ['admin'] },
        children: [
            {
                path: 'index',
                name: '首页',
                component: () => import ( /* webpackChunkName: "index" */ '~comp/index'),
                meta: {
                    roles: ['admin', 'editor'],
                    icon: 'shouyeyong',
                    title: '首页'
                }
            }
        ]
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
