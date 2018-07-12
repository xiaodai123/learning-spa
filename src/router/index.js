const routes = [
    //从 vue-loader@13.0.0，不能用 require 来引入 .vue 文件，因为 .vue 文件最终会被编译成 ES6 module。
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
        component: () => 
            import ( /* webpackChunkName: "index" */ '~comp/index'),
    }
]

module.exports = routes;
