import Cookies from 'js-cookie';
class token {
    static getToken() {
        return Cookies.get('x-token');
    }
    static setToken(token) {
        Cookies.set('x-token', token);
    }
    static removeToken() {
        return Cookies.remove('x-token');
    }
}
class validate {
    static isvalidUsername(str) {
        const validMap = ['admin', 'editor'];
        return validMap.indexOf(str.trim()) >= 0;
    }
}
// 根据url获取参数并转换为对象
function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    // sdas:wqe,
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}
// class session {
//     static getSessionId() {
//         return sessionStorage.getItem('sessionId');
//     }
//     static setSessionId(sessionId) {
//         sessionStorage.setItem('sessionId', sessionId);
//     }
// }

export {
    token,
    validate,
    param2Obj
}