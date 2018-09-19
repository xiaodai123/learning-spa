<template>
    <el-dropdown trigger="click" @command="handleSetLanguage">
        <FontIcon style="font-size: 24px;" :icon="currentLanguage"></FontIcon>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh_CN" :disabled="currentLanguage === 'zh_CN'">中文</el-dropdown-item>
            <el-dropdown-item command="en_US" :disabled="currentLanguage === 'en_US'">English</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
require('../../assets/icon/iconfont.css');
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import FontIcon from '~comp/common/FontIcon';
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

export default {
    computed: {
        ...mapGetters({
            currentLanguage: 'language'
        })
    },
    methods: {
        handleSetLanguage(lang) {
            this.$i18n.locale = lang;
            this.$store.dispatch('publics/setLanguage', lang);
        }
    },
    components: {
        FontIcon
    }
}
</script>
<style lang="sass" scoped>

</style>

