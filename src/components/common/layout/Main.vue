<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view :key="key"></router-view>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'Main',
    computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews
        },
        key() {
            return this.$route.fullPath
        }
    }
}
</script>

<style lang="sass">
.app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    position: relative;
    overflow: hidden;
    padding: 20px;    
    /*fade*/

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.28s;
    }

    .fade-enter-to,
    .fade-leave-active {
        opacity: 0;
    }

    /*fade-transform*/
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all .5s;
    }
    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }
    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
}
</style>
