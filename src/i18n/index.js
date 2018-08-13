import VueI18n from 'vue-i18n';
import Vue from 'vue';
import Cookies from 'js-cookie';
import locale from 'element-ui/lib/locale';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import enLocale from './en_US';
import zhLocale from './zh_CN';

Vue.use(VueI18n);

const messages = {
    en_US: {
        ...enLocale,
        ...elementEnLocale
    },
    zh_CN: {
        ...zhLocale,
        ...elementZhLocale
    }
}

const i18n = new VueI18n({
    locale: Cookies.get('lang') || 'zh_CN',
    messages
});

// 为了实现element插件的多语言切换
locale.i18n((key, value) => i18n.t(key, value));

export default i18n