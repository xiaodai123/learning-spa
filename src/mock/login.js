import { param2Obj, token } from '~compJs/util';

const userMap = {
    admin: {
        roles: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        name: 'daizhi'
    },
    editor: {
        roles: ['editor'],
        token: 'editor',
        introduction: '我是编辑',
        name: 'Normal Editor'
    }
}

export default {
    loginByUserName: config => {
        const { userName } = JSON.parse(config.body);
        return userMap[userName];
    },
    getUserInfo: config => {
        const { token } = param2Obj(config.url);
        if (userMap[token]) {
            return userMap[token];
        } else {
            return false;
        }
    },
    logout: () => {
        token.removeToken();
        return true;
    }
}