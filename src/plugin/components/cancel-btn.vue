<template>
    <button v-if="enabled" :class="['dg-btn', 'dg-btn--cancel', {'dg-pull-right': reverse}]"
            @click.prevent="$emit('click')" ref="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: ['enabled', 'reverse', 'focus', 'loading'],
        mounted(){
            this.focus && this.$refs.btn.focus()
        }
    }
</script>