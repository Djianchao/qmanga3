<template>
	<div class="slider-list">
		<Title bg='none'>
			<div slot="left">
				<h2>{{ title }}</h2>
			</div>
		</Title>
		<div class="warpper">
			<div
				class="list"
				:style="{ transform: `translateX(${offsetX}px)` }"
				ref="scrollBox"
			>
				<Manga
					:isTitle="false"
					type="small"
					v-for="(info, index) in list"
					:key="index"
					:info="info"
					ref="manga"
					@getWidth="handleClick"
				>
				</Manga>
			</div>
			<div
				class="rbox"
				ref="right"
				:class="{ abled: rable }"
			>
				<div class="rarrow"></div>
			</div>
			<div
				class="lbox"
				ref="left"
				:class="{ abled: lable }"
			>
				<div class="larrow"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getList } from "@/api/index";

	let page = Math.round(Math.random() * 20);
	export default {
		name: "SlideList",
		data() {
			return {
				offsetX: 0,
				list: [],
				rable: true,
				lable: false,
			};
		},
		// props 的优先级比 data 的高，一般不要再props中修改数据，如果真要修改则用data
		props: {
			title: {
				type: String,
			},
			params: {
				type: Object,
			},
		},
		mounted() {
			Promise.all([
				this.load(this.params, page),
				this.load(this.params, page + 1),
			]).then((res) => {
				res.forEach((data) => {
					this.list = this.list.concat(data);
				});
				this.$nextTick(this.handleClick);
			});
		},
		methods: {
			handleClick() {
				const rightBtn = this.$refs.right;
				const leftBtn = this.$refs.left;

				rightBtn.addEventListener("click", () => {
					const width = document.querySelector(".slider-list a").clientWidth + 10;
					const boxWidth = this.$refs.scrollBox.clientWidth;
					const scrollViewWidth = width * this.list.length;
					const oneSlideOffset = 3 * width;
					// 加上30 是因为第一张图片padding-left 了 30
					const maxOffset = scrollViewWidth - boxWidth + 30;

					if (this.rable) {
						// 滑动一步后 距离如果小于maxOffset 则正常滑动
						if (Math.abs(this.offsetX) + oneSlideOffset < maxOffset) {
							this.offsetX -= oneSlideOffset;
							this.lable = true;
						} else {
							// 直接滑到底
							this.offsetX = -maxOffset;
							this.rable = false;
						}
					}
				});

				// 逻辑和 上面类似
				leftBtn.addEventListener("click", () => {
					const width = document.querySelector(".slider-list a").clientWidth + 10;
					const oneSlideOffset = 3 * width;
					// 加上30 是因为第一张图片padding-left 了 30
					if (this.lable) {
						if (Math.abs(this.offsetX) - oneSlideOffset > 0) {
							this.offsetX += oneSlideOffset;
							this.rable = true;
						} else {
							this.offsetX = 0;
							this.lable = false;
						}
					}
				});
			},
			load(params, page) {
				return new Promise((resolve) => {
					getList(params, page)
						.then((res) => {
							resolve(this.$fillList(res.data, ".mh-item"));
						})
						.catch((err) => {
							// console.log(err);
						});
				});
			},
		},
	};
</script>

<style lang="less" scoped>
	.slide {
		transform: translateX(-2.5rem);
	}
	.warpper {
		margin: 20px;
		position: relative;
		overflow: hidden;
		min-height: 1.875rem;
	}
	.list {
		background-color: black;
		display: flex;
		padding: 15px 0;
		gap: 10px;
		border-radius: 10px;
		transition: transform 0.4s;
		// overflow: hidden;
	}
	.list a {
		display: inline-block;
		// min-width: 1.875rem;
		// min-width: 1.875rem;
		flex: 1 0 1.875rem;
		&:first-child {
			margin-left: 30px;
		}
	}

	.rbox,
	.lbox {
		cursor: pointer;
		position: absolute;
		height: 100%;
		width: 6%;
		top: 0;
		display: flex;
		align-items: center;
		transition: opacity 0.4s;
		opacity: 0.7;
	}

	.rbox {
		background: linear-gradient(90deg, transparent, #000 70%);
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		right: 0;
	}

	.lbox {
		background: linear-gradient(270deg, transparent, #000 70%);
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		left: 0;
	}

	.lbox:hover,
	.rbox:hover {
		opacity: 0.9;
	}

	.rarrow,
	.larrow {
		width: 25px;
		height: 25px;
		border-width: 6px;
		border-color: #fff;
		opacity: 0.2;
		position: absolute;
		transition: right 0.4s, left 0.4s;
	}

	.rarrow {
		right: 50%;
	}

	.larrow {
		left: 50%;
	}
	.abled.rbox:hover .rarrow,
	.abled.lbox:hover .larrow {
		border-color: @yellow;
		opacity: 1;
	}
	.abled .rarrow,
	.abled .larrow {
		opacity: 1;
	}
	.lbox:hover .larrow {
		left: 40%;
	}

	.rbox:hover .rarrow {
		right: 40%;
	}

	.title-box {
		background: linear-gradient(90deg, #5d0914, rgba(93, 9, 20, 0)) !important;
		height: 0.875rem !important;
	}
</style>