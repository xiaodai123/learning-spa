<template>
    <div data-sidebar-item v-if="!item"></div>
</template>
<script>
import path from 'path';
export default {
    name: 'SidebarItem',
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            onlyOneChild: null
        }
    },
    methods: {
        hasOneShowingChild(children) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false;
                } else {
                    this.onlyOneChild = item;
                    return true;
                }
            })
            if (showingChildren.length === 1) {
                return true;
            }
            return false;
        },
        resolvePath(...paths) {
            return path.resolve(this.basePath, ...paths);
        }
    }
}
</script>

