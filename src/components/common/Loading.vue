<template>
	<div
		:class="fullScreen ? 'fullScreen' : 'mask'"
		v-show="loading"
	>
		<div class="box">
			<div class="cat">
				<div class="cat__body"></div>
				<div class="cat__body"></div>
				<div class="cat__tail"></div>
				<div class="cat__head"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "Loading",
		data() {
			return {
				loading: "",
				fullScreen: false,
			};
		},
	};
</script>
<style lang="less" scoped>
	.cat {
		position: relative;
		width: 100%;
		max-width: 1rem;
		overflow: hidden;
	}
	.cat::before {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
	.cat:active > * {
		animation-play-state: running;
	}

	.cat__body,
	.cat__tail,
	.cat__head {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		animation: rotating 2.79s cubic-bezier(0.65, 0.54, 0.12, 0.93) infinite;
	}
	.cat__body::before,
	.cat__tail::before,
	.cat__head::before {
		content: "";
		position: absolute;
		width: 50%;
		height: 50%;
		background-size: 200%;
		background-repeat: no-repeat;
		background-image: url("../../assets/icons/cat.png");
	}

	.cat__head::before {
		top: 0;
		right: 0;
		background-position: 100% 0%;
		transform-origin: 0% 100%;
		transform: rotate(90deg);
	}

	.cat__tail {
		animation-delay: 0.2s;
	}
	.cat__tail::before {
		left: 0;
		bottom: 0;
		background-position: 0% 100%;
		transform-origin: 100% 0%;
		transform: rotate(-30deg);
	}

	.cat__body {
		animation-delay: 0.1s;
	}
	.cat__body:nth-of-type(2) {
		-webkit-animation-delay: 0.2s;
		animation-delay: 0.2s;
	}
	.cat__body::before {
		right: 0;
		bottom: 0;
		background-position: 100% 100%;
		transform-origin: 0% 0%;
	}

	@-webkit-keyframes rotating {
		from {
			transform: rotate(720deg);
		}
		to {
			transform: none;
		}
	}

	@keyframes rotating {
		from {
			transform: rotate(720deg);
		}
		to {
			transform: none;
		}
	}
	.box {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: flex-start;
		justify-content: center;
		align-items: center;
	}

	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 999;
		background: transparent;
		display: flex;
	}
	.fullScreen {
		.box {
			height: 100vh;
			width: 100vw;
			position: fixed;
			z-index: 999;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: transparent;
		}
	}
</style>