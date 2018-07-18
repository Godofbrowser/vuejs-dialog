<template>
    <button v-if="enabled" :class="['dg-btn', 'dg-btn--cancel', {'dg-pull-right': options.reverse}]"
            @click.prevent="$emit('click')" ref="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            enabled: {
                required: false,
                type: Boolean,
                'default': true
            },
            options: {
                required: true,
                type: Object
            },
            focus: {
                required: false,
                type: Boolean,
                'default': false
            },
            loading: {
                required: false,
                type: Boolean,
                'default': false
            }
        },
        mounted(){
            this.focus && this.$refs.btn.focus()
        }
    }
</script>