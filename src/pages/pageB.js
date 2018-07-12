import {utilB} from './../assets/js/util/utilB';

console.log(utilB);
//异步加载，类似于import()
const utilC = () => require.ensure(['./../assets/js/util/utilC'], require => {
    console.log(require('./../assets/js/util/utilC'));
},'utilC-chunk-name');
utilC();

//import
// import('./../util/utilA').then(moment => console.log(moment().utilA + 'qqqqq'));