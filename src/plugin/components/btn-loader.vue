<template>
<span class="dg-btn-loader">
	<span id="dg-circleG">
		<span id="dg-circleG_1" class="dg-circleG"></span>
		<span id="dg-circleG_2" class="dg-circleG"></span>
		<span id="dg-circleG_3" class="dg-circleG"></span>
	</span>
</span>
</template>

<style lang="css">
	.dg-btn-loader{
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		top: 0;
		left: 0;
	}

	#dg-circleG{
		width: 67px;
		margin: auto;
	}

	.dg-circleG{
		background-color:rgb(255,255,255);
		float:left;
		height:14px;
		margin-left:8px;
		width:14px;
		animation-name: dg-bounce_circleG;
		-o-animation-name: dg-bounce_circleG;
		-ms-animation-name: dg-bounce_circleG;
		-webkit-animation-name: dg-bounce_circleG;
		-moz-animation-name: dg-bounce_circleG;
		animation-duration:0.5875s;
		-o-animation-duration:0.5875s;
		-ms-animation-duration:0.5875s;
		-webkit-animation-duration:0.5875s;
		-moz-animation-duration:0.5875s;
		animation-iteration-count:infinite;
		-o-animation-iteration-count:infinite;
		-ms-animation-iteration-count:infinite;
		-webkit-animation-iteration-count:infinite;
		-moz-animation-iteration-count:infinite;
		animation-direction:normal;
		-o-animation-direction:normal;
		-ms-animation-direction:normal;
		-webkit-animation-direction:normal;
		-moz-animation-direction:normal;
		border-radius:9px;
		-o-border-radius:9px;
		-ms-border-radius:9px;
		-webkit-border-radius:9px;
		-moz-border-radius:9px;
	}

	#dg-circleG_1{
		animation-delay:0.1195s;
		-o-animation-delay:0.1195s;
		-ms-animation-delay:0.1195s;
		-webkit-animation-delay:0.1195s;
		-moz-animation-delay:0.1195s;
	}

	#dg-circleG_2{
		animation-delay:0.2755s;
		-o-animation-delay:0.2755s;
		-ms-animation-delay:0.2755s;
		-webkit-animation-delay:0.2755s;
		-moz-animation-delay:0.2755s;
	}

	#dg-circleG_3{
		animation-delay:0.3485s;
		-o-animation-delay:0.3485s;
		-ms-animation-delay:0.3485s;
		-webkit-animation-delay:0.3485s;
		-moz-animation-delay:0.3485s;
	}



	@keyframes dg-bounce_circleG{
		0%{}

		50%{
			background-color:rgb(9,162,227);
		}

		100%{}
	}

	@-o-keyframes dg-bounce_circleG{
		0%{}

		50%{
			background-color:rgb(9,162,227);
		}

		100%{}
	}

	@-ms-keyframes dg-bounce_circleG{
		0%{}

		50%{
			background-color:rgb(9,162,227);
		}

		100%{}
	}

	@-webkit-keyframes dg-bounce_circleG{
		0%{}

		50%{
			background-color:rgb(9,162,227);
		}

		100%{}
	}

	@-moz-keyframes dg-bounce_circleG{
		0%{}

		50%{
			background-color:rgb(9,162,227);
		}

		100%{}
	}
</style>