import Layout from './../components/common/layout/Layout';
const routes = [
    {
        path: '/test1',
        component: Layout,
        redirect: '/test1/index',
        // alwaysShow: true, // will always show the root menu
        meta: {
            roles: ['admin', 'editor'], // you can set roles in root nav
            icon: 'shouyeyong',
            title: '测试页1'
        },
        children: [
            {
                path: 'index',
                name: '测试页1-1',
                component: () => import ( /* webpackChunkName: "test1" */ '~comp/test'),
                meta: {
                    roles: ['admin', 'editor'],
                    icon: 'shouyeyong',
                    title: '测试页1-1'
                }
            },
            {
                path: 'test2',
                name: '测试页1-2',
                component: () => import ( /* webpackChunkName: "test2" */ '~comp/test2'),
                meta: {
                    roles: ['admin', 'editor'],
                    icon: 'shouyeyong',
                    title: '测试页1-2'
                }
            }
        ]
    },
    {
        path: '/test2',
        component: Layout,
        redirect: '/test2/index',
        // alwaysShow: true, // will always show the root menu
        meta: {
            // title: 'testComp',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
            {
                path: 'index',
                name: '测试页3',
                component: () => import ( /* webpackChunkName: "test1" */ '~comp/test3'),
                meta: {
                    roles: ['admin', 'editor'],
                    icon: 'shouyeyong',
                    title: '测试页3'
                }
            }
        ]
    }
];

export default routes;