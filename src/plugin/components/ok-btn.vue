<template>
    <button v-if="enabled" :class="['dg-btn', 'dg-btn--ok', {'dg-btn--loading': loading}, {'dg-pull-right': !reverse}]"
            @click.prevent="$emit('click')" ref="btn">
        <span class="dg-btn-content"><slot></slot></span>
        <span is="btn-loader" v-if="loading"></span>
    </button>
</template>

<script>
    import BtnLoader from './btn-loader.vue'
    export default {
        props: ['enabled', 'reverse', 'focus', 'loading'],
        mounted(){
            this.focus && this.$refs.btn.focus()
        },
        components: {BtnLoader}
    }
</script>