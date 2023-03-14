<template>
	<div>
		<div class="wrapper">
			<div
				class="slide-box"
				:style="{ flexBasis: width + 'px', transform: slide() }"
			>
				<a
					href=""
					v-for="(img, index) in imgs"
					:key="index"
					role="tabpanel"
					@click.prevent="goDetail(img.href)"
				><img :src="img.src" /></a>
			</div>
		</div>
		<div class="btn-box-wrap">
			<div
				class="btn-box"
				ref="btnBox"
			>
				<button
					v-for="(btn, index) in btns"
					:key="index"
					:class="{ dot: true, active: btn.active }"
					role="tab"
					@click="switchBanner(index)"
				></button>
			</div>
		</div>
	</div>
</template>
<script>
	let screen, slideCount, currentCout;
	screen = slideCount = currentCout = 0;
	let timer = null;

	export default {
		name: "SlideBanner",
		data() {
			return {
				imgs: this.$store.state.settings.banners,
				width: "0",
				offsetX: 0,
				btns: [],
			};
		},
		mounted() {
			this.showBanner();
			this.getSlideCount();
			this.calcBtn();
			window.addEventListener("resize", () => {
				this.showBanner();
				this.getSlideCount();
				this.calcBtn();
				console.log("slidebanner onresize...");
			});
			timer = window.setInterval(() => {
				currentCout++;
				if (currentCout >= slideCount) {
					currentCout = 0;
				}
				this.switchBanner(currentCout);
				this.offsetX = -this.width * currentCout;
			}, 5000);
		},
		beforeDestroy() {
			if (timer) {
				window.clearInterval(timer);
			}
		},
		methods: {
			showBanner() {
				screen = document.body.clientWidth;
				if (screen > 1024) {
					this.width = screen / 2;
				} else {
					this.width = screen;
				}
				this.width;
			},
			getSlideCount() {
				let len = this.imgs.length;
				// debugger;
				slideCount = this.width === screen ? len : len - 1;
			},
			slide() {
				return `translateX(${this.offsetX}px)`;
			},
			switchBanner(index) {
				this.btns.forEach((btn) => {
					btn.active = false;
				});
				this.btns[index].active = true;
				this.offsetX = -(this.width * index);
			},
			calcBtn() {
				let btns = [];
				for (let i = 0; i < slideCount; i++) {
					btns.push(Object.create({ active: false }));
				}
				btns[0].active = true;
				this.btns = btns;
			},
			goDetail(href) {
				this.$router.push({
					name: "detail",
					params: {
						id: href.split("/")[1],
					},
				});
			},
		},
	};
</script>
<style lang="less" scoped>
	.wrapper {
		// transform: translateX();
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(220, 9, 20, 0));
		overflow: hidden;
		.slide-box {
			display: flex;
			padding: 0.3125rem 0 5px 0;
			transition: transform 0.5s;

			a {
				display: block;
				flex-basis: inherit;
				flex-grow: 0;
				flex-shrink: 0;
			}
			img {
				width: 96%;
				height: auto;
				/* 让 img 在 a 标签中居中就均分了多余的空间了 */
				display: block;
				margin: 0 auto;
				border-radius: 10px;
				transition: transform 0.2s;
				&:hover {
					transform: scale(1.025);
				}
			}
		}
	}

	.btn-box-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 0.75rem;
		width: 100%;
		margin: 0.0625rem 0 0.25rem 0;
		.btn-box {
			background-color: rgba(0, 0, 0, 0.4);
			border-radius: 8px;
			padding: 0.1rem 0.1874rem;
		}

		.dot {
			padding: 0;
			box-sizing: content-box;
			cursor: pointer;
			border: none;
			width: 12px;
			height: 12px;
			background-color: rgb(110, 110, 110);
			background-clip: content-box;
			padding: 0 4px;
			border-radius: 100%;
			margin: 8px 4px;
			&::after {
				display: inline-block;
				content: "";
				width: 100%;
				height: 100%;
				border-radius: 100%;
				transition: transform 0.2s;
				background-color: hsla(0, 0%, 100%, 0.2);
			}
			&:hover {
				&::after {
					transform: scale(2);
				}
			}

			&.active {
				background-color: @yellow;
				border-radius: 10px;
				transition: background-color 0.3s;
				padding: 0 4px;
				background-clip: border-box;
				&::after {
					display: none;
				}
			}
		}
	}
</style>