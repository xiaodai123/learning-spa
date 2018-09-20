<template>
    <div data-navbar-box>
        <el-menu class="navbar" mode="horizontal">
            <div style="display: flex;">
                <!-- 控制左边菜单是否收缩 -->
                <div class="hamburger-container">
                    <FontIcon class="hamburger" @click.native="toggleSideBar" :class="{'is-active':isActive}" icon="menu"></FontIcon>
                </div>
                <!-- 菜单面包屑 -->
                <Breadcrumb style="flex:1;"></Breadcrumb>
                <!-- 其他功能 -->
                <div class="right-menu">
                    <!-- 是否全屏显示 -->
                    <Screenfull class="for-line"></Screenfull>
                    <!-- 设置国际化 -->
                    <LangSelect class="for-line"></LangSelect>
                    <!-- 用户操作 -->
                    <el-dropdown class="for-line" trigger="click">
                        <div style="display:flex;">
                            <img class="user-img" :src="userJpg" alt="">
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/">
                                <el-dropdown-item>首页</el-dropdown-item>
                            </router-link>
                            <el-dropdown-item divided>
                                <span @click="logout" style="display:block;">退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-menu>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import FontIcon from '~comp/common/FontIcon';
import Screenfull from '~comp/common/Screenfull';
import LangSelect from '~comp/common/LangSelect';
import Breadcrumb from './Breadcrumb';
import userJpg from '~compImg/user.jpg';
import $v from '~compJs/ajax';
import { TO_URL } from '~compJs/public';
import { Menu, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
    components: {
        FontIcon,
        Breadcrumb,
        Screenfull,
        LangSelect
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        isActive() {
            return !this.sidebar.opened;
        }
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('publics/toggleSideBar');
        },
        logout() {
            $v.post(TO_URL + '/logout', {}, data => {
                window.location.href = 'login.html';
            }, error => {
                console.log(error);
            });
        }
    },
    data() {
        return {
            userJpg
        }
    }
}
</script>
<style lang="sass">
div[data-navbar-box] {
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px!important;
        .hamburger-container {
            line-height: 53px;
            height: 50px;
            padding: 0 13px;
            float: left;
            .hamburger {
                display: inline-block;
                cursor: pointer;
                width: 20px;
                height: 20px;
                transform: rotate(0deg);
                transition: .38s;
                transform-origin: 50% 50%;
            }
            .hamburger.is-active {
                transform: rotate(90deg);
            }
        }
        .right-menu {
            height: 50px;
            line-height: 50px;
            margin-right: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            .for-line {
                font-size: 25px!important;
                line-height: inherit;
                margin: 0 15px;
            }
            .user-img{
                width: 30px;
                height: 30px;
            }
            .user-img:hover {
                transform: rotate(666turn);
                transition-duration: 59s;
                transition-timing-function: cubic-bezier(.34, 0, .84, 1)
            }
        }
    }
}
</style>

