import axios from 'axios';
import {
    Loading,
    Message
} from 'element-ui';
import {
    token
} from './util';

const TIPS_TIME = 2000;

// 创建axios实例
const service = axios.create({
    baseURL: '',
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    let xtoken = token.getToken();
    if (xtoken) {
        config.headers['X-Token'] = xtoken;
    }
    // let sessionId = session.getSessionId;
    // if (sessionId) {
    //     config.headers['X-SessionId'] = sessionId;
    // }
    return config;
}, error => {
    console.log(error);
    Promise.reject(error);
});

// response拦截器
// service.interceptors.response.use(response => {
//     const res = response.data;
//     if (res.code !== 20000) {
//         Message.error({
//             message: res.message,
//             duration: TIPS_TIME
//         });
//         // 如果登录过期
//         // sessionStorage.clear();
//         return Promise.reject(res.message);
//     } else {
//         return response;
//     }
// });
/**
 * 封装axios
 */
class $v {
    static get(url, params, successFb, failFb, loadingText = '') {
        return new Promise((resolve, reject) => {
            let loadingInstance = Loading.service({ fullscreen: true, text: loadingText });
            service.get(url, {
                params: params
            }).then(response => {
                if (successFb && typeof successFb === 'function') {
                    successFb(response);
                }
                if (loadingInstance) {
                    loadingInstance.close();
                }
                resolve(response);
            }).catch(err => {
                if (failFb && typeof failFb === 'function') {
                    failFb(err.response);
                } else {
                    Message.error({
                        message: err.response.message,
                        duration: TIPS_TIME
                    });
                }
                if (loadingInstance) {
                    loadingInstance.close();
                }
                reject(err);
            });
        })
    }

    static post(url, data, successFb, failFb, loadingText = '') {
        return new Promise((resolve, reject) => {
            let loadingInstance = Loading.service({ fullscreen: true, text: loadingText });
            service.post(url, data).then(response => {
                if (successFb && typeof successFb === 'function') {
                    successFb(response);
                }
                if (loadingInstance) {
                    loadingInstance.close();
                }
                resolve(response);
            }).catch(err => {
                if (failFb && typeof failFb === 'function') {
                    failFb(err.response);
                } else {
                    Message.error({
                        message: err.response.message,
                        duration: TIPS_TIME
                    });
                }
                if (loadingInstance) {
                    loadingInstance.close();
                }
                reject(err);
            });
        })
    }

    static put(url, data, successFb, failFb, loadingText = '') {
        return new Promise((resolve, reject) => {
            let loadingInstance = Loading.service({ fullscreen: true, text: loadingText });
            service.put(url, data).then(response => {
                if (successFb && typeof successFb === 'function') {
                    successFb(response);
                }
                if (loadingInstance) {
                    loadingInstance.close();
                }
                resolve(response);
            }).catch(err => {
                if (failFb && typeof failFb === 'function') {
                    failFb(err.response);
                } else {
                    Message.error({
                        message: err.response.message,
                        duration: TIPS_TIME
                    });
                }
                if (loadingInstance) {
                    loadingInstance.close();
                }
                reject(err);
            });
        })
    }
}

export default $v;