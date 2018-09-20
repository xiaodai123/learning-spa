<template>
    <FontIcon @click.native="toggleFull" icon="forbig"></FontIcon>
</template>
<script>
import FontIcon from './FontIcon';
import screenfull from 'screenfull'
export default {
    name: 'screenfull',
    components: {
        FontIcon
    },
    data() {
        return {
            isFullScreen: false
        }
    },
    methods: {
        toggleFull(){
            if (!screenfull.enabled) {
                return false;
            }
            screenfull.toggle();
        }
    }
}
</script>

