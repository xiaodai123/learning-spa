const routes = [
    {
        path: '/test',
        component: () => import ( /* webpackChunkName: "test" */ '~comp/test'),
        alwaysShow: true, // will always show the root menu
        meta: {
            title: 'testComp',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: []
    }
]