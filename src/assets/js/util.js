class token {
    static getToken() {
        return sessionStorage.getItem('x-token');
    }
    static setToken(token) {
        sessionStorage.setItem('x-token', token);
    }
}
class validate {
    static isvalidUsername(str) {
        const validMap = ['daizhi', 'editor'];
        return validMap.indexOf(str.trim()) >= 0;
    }
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
    validate
}