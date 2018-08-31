<template>
    <div data-index-box>
        这是{{page}}页面
        <div class="div3"></div>
        <br>
        <el-button type="primary" @click="changeToken">改变Token</el-button>
        <br>
    </div>
</template>
<script>
import { Button } from 'element-ui';
import { mapGetters } from 'vuex';
import Vue from 'vue';
Vue.use(Button);
export default {
    data(){
        return {
            page: 'index'
        }
    },
    methods: {
        changeToken() {
            this.$store.commit('auth/setToken', 'qwe');
        }
    },
    computed: {
        // ...mapGetters({
        //     token2: 'auth/token1'
        // })
    }
}
</script>
<style lang="sass">
    div[data-index-box] {
        .div3 {
            width: 100px;
            height: 100px;
            background-color: aqua;
        }
    }
</style>


