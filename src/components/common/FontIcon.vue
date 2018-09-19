<template>
    <i :class="getIcon"></i>
</template>
<script>
import { FONT_IMG } from '~compJs/public';
export default {
    name: 'FontIcon',
    props: {
        icon: {
            type: String,
            required: true
        }
    },
    computed: {
        getIcon() {
            return FONT_IMG + this.icon;
        }
    }
}
</script>

