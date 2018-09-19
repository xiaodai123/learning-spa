import Layout from './../components/common/layout/Layout';
const routes = [
    {
        path: '/test1',
        component: Layout,
        redirect: '/test1/index',
        alwaysShow: true, // will always show the root menu
        meta: {
            // title: 'testComp',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
            path: 'index',
            component: () => import ( /* webpackChunkName: "test1" */ '~comp/test'),
            meta: {
                roles: ['admin', 'editor'] // you can set roles in root nav
            }
        }]
    }
];

export default routes;