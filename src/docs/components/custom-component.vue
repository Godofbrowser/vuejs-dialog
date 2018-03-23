<template>
    <div class="custom-view-wrapper">
        <h2>Tell someone about this amazing plugin</h2>

        <div v-if="options.html" class="dg-content" v-html="messageBody"></div>
        <div v-else="" class="dg-content">{{ messageBody }}</div>

        <ok-btn @click="proceed()" :loading="loading" :options="options" :enabled="true">Share on facebook</ok-btn>
        <ok-btn @click="proceed()" :loading="loading" :options="options" :enabled="true">Share on twitter</ok-btn>
        <ok-btn @click="proceed()" :loading="loading" :options="options" :enabled="true">Share on linkedIn</ok-btn>
        <cancel-btn @click="cancel()" :loading="loading" :options="options" :enabled="true">Maybe later!</cancel-btn>
    </div>
</template>

<script>
    import DialogMixin from '../../plugin/js/mixins/dialog-mixin'

    export default {
        mixins: [DialogMixin]
    }
</script>

<style scoped="">
    button {
        width: 100%;
        margin-bottom: 10px;
        float: none;
    }
</style>
