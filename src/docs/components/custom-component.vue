<template>
    <div class="custom-view-wrapper">
        <template v-if=messageHasTitle>
            <h2 v-if="options.html" class="dg-title" v-html="messageTitle"></h2>
            <h2 v-else class="dg-title">{{ messageTitle }}</h2>
        </template>
        <template v-else>
            <h2>Share with friends</h2>
        </template>

        <div v-if="options.html" class="dg-content" v-html="messageBody"></div>
        <div v-else class="dg-content">{{ messageBody }}</div>
        <br/>

        <ok-btn @click="handleShare('facebook')" :options="options">Facebook</ok-btn>
        <ok-btn @click="handleShare('twitter')" :options="options">Twitter</ok-btn>
        <ok-btn @click="handleShare('googleplus')" :options="options">Google+</ok-btn>
        <ok-btn @click="handleShare('linkedin')" :options="options">LinkedIn</ok-btn>
        <cancel-btn @click="handleDismiss()" :options="options">Dismiss</cancel-btn>
    </div>
</template>

<script>
    import DialogMixin from '../../plugin/js/mixins/dialog-mixin'
    import OkBtn from '../../plugin/components/ok-btn.vue'
    import CancelBtn from '../../plugin/components/cancel-btn.vue'

    export default {
        mixins: [ DialogMixin ],
        methods: {
            handleShare(platform) {
                this.proceed(platform)
            },
            handleDismiss() {
                this.cancel()
            }
        },
        components: { CancelBtn, OkBtn }
    }
</script>

<style scoped="">
    button {
        width: 100%;
        margin-bottom: 10px;
        float: none;
    }
</style>
