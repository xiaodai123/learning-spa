import Cookies from 'js-cookie';

const publics = {
    namespaced: true,
    state: {
        language: Cookies.get('lang') || 'zh_CN',
        sidebar: {
            /**
             * +hideNotice 把字符串转换为数字。
             * !+hideNotice 逻辑非运算，当数字为 0 或者 NaN 时返回 true
             * 1为打开状态，0为关闭状态
             */
            opened: !+Cookies.get('sidebarStatus') || true,
            withoutAnimation: false
        }
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            Cookies.set('lang', language);
        },
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1);
            } else {
                Cookies.set('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
            state.sidebar.withoutAnimation = false;
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 1);
            state.sidebar.opened = false;
            state.sidebar.withoutAnimation = withoutAnimation;
        }
    },
    actions: {
        setLanguage({ commit }, language) {
            commit('SET_LANGUAGE', language);
        },
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR');
        },
        closeSidebar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation);
        }
    }
}
export default publics