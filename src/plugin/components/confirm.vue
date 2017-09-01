<template>
	<div>
		<transition name="zoomIn" appear="" @after-leave="anmiationEnded">
		<div v-if="show" ref="container" class="dg-container">
			<div class="dg-content-cont dg-content-cont--floating">
				<div class="dg-main-content">
					<!--<div class="dg-header">-->
					<!---->
					<!--</div>-->

					<div v-if="options.html" class="dg-content" v-html="options.message"></div>
					<div v-else="" class="dg-content">{{ options.message }}</div>

					<div class="dg-footer">
						<button ref="lb" class="dg-btn dg-btn--left" @click.prevent="clickLeftBtn()">Cancel</button>


							<button @click.prevent="clickRightBtn()"
									:class="['dg-btn', 'dg-btn--right', {'dg-btn--loading': loading}]">
								<span class="dg-btn-content">Proceed</span>
								<transition mode="out-in" :duration="500">
								<span class="dg-btn-loader" v-if="loading">
									<span id="dg-circleG">
										<span id="dg-circleG_1" class="dg-circleG"></span>
										<span id="dg-circleG_2" class="dg-circleG"></span>
										<span id="dg-circleG_3" class="dg-circleG"></span>
									</span>
								</span>
								</transition>
							</button>

						<div class="dg-clear"></div>
					</div>
				</div>
			</div>
		</div>
		</transition>

		<div class="dg-backdrop"></div>
	</div>
</template>

<script>
	export default {
		data: function () {
			return {
			    show: true,
                loading: false
			}
		},
		props: {
			options: {
				type: Object,
				required: true
			}
		},
		mounted(){
			this.$refs['lb'].focus()
		},
		computed: {
		    loaderEnabled(){
		        return this.options.loader === true
			}
		},
		methods: {
            clickRightBtn(){
                this.proceed()
			},
            clickLeftBtn(){
                this.cancel()
			},
			proceed(){
				if(this.loaderEnabled){
                    this.switchLoadingState(true)
                    this.options.promiseResolver({
                        close: this.close,
                        loading: this.switchLoadingState
                    })
				}else{
                    this.options.promiseResolver(true)
                    this.close()
				}
			},
			cancel(){
				if (this.loading === true)
					return
				this.close()
                this.options.promiseRejecter(false)
			},
            switchLoadingState(loading = false){
				this.loading = !!loading
			},
			close(){
				this.show = false
			},
            anmiationEnded(){
                this.$emit('close')
			}
		}
	}
</script>

<style>
	@import '../styles/_animations.css';
	@import '../styles/default.css';
</style>
