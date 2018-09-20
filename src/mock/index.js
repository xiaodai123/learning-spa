import Mock from 'mockjs';
import loginAPI from './login';


// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.loginByUserName);
Mock.mock(/\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo);





export default Mock;
