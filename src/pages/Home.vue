<template >
	<div>
		<SlideBanner />
		<main>
			<div class="center">
				<MangaList
					:api='getRandomList'
					:isScroll='false'
					:fullScreen='false'
					:initPage=2
				/>
				<div class="gap"></div>
				<div
					class="hot-box mobile"
					v-if="this.$store.state.settings.mode == 'mobile'"
				>
					<Title bg='linear-gradient(90deg,rgba(220,9,20,.5),rgba(220,9,20,0)'>
						<template slot="left">
							<img
								src="../assets/icons/hot.svg"
								alt
							/>
							<h2>随机热门</h2>
						</template>
					</Title>

					<div class="hot-list">
						<Manga
							type="xsmall"
							v-for="(manga, index) in hotMangas"
							:key="index"
							:info="manga"
						>
							<div
								class="rank"
								slot="rank"
							>
								<img
									:src="'../assets/icons/rank' + index + '.png'"
									v-if="index < 3"
								/>
								<span
									class="rankNum"
									v-else
								> {{ index + 1 }}</span>
							</div>
						</Manga>
					</div>
				</div>
				<SlideList
					title="热血区"
					:params="{ type: 31, state: 0, sort: 10 }"
				/>
				<SlideList
					title="纯爱区"
					:params="{ type: 26, state: 0, sort: 10 }"
				/>
				<SlideList
					title="科幻区"
					:params="{ type: 25, state: 0, sort: 10 }"
				/>
				<SlideList
					title="悬疑区"
					:params="{ type: 17, state: 0, sort: 10 }"
				/>
			</div>
			<aside v-if="this.$store.state.settings.mode == 'pc'">
				<div class="hot-box">
					<Title bg='linear-gradient(90deg,rgba(220,9,20,.5),rgba(220,9,20,0)'>
						<template slot="left">
							<img
								src="../assets/icons/hot.svg"
								alt
							/>
							<h2>随机热门</h2>
						</template>
					</Title>

					<div class="hot-list">
						<Manga
							type="xsmall"
							v-for="(manga, index) in hotMangas"
							:key="index"
							:info="manga"
						>
							<div
								class="rank"
								slot="rank"
							>
								<img
									:src="'../assets/icons/rank' + index + '.png'"
									v-if="index < 3"
								/>
								<span
									class="rankNum"
									v-else
								> {{ index + 1 }}</span>
							</div>
						</Manga>
					</div>
				</div>
			</aside>
		</main>
		<footer class="footer">
			<p>
				申明：本站所有漫画均来自互联网收集而来，版权归原创者所有，本站只提供web页面服务，并不提供资源存储。
			</p>
		</footer>
	</div>
</template>
<script>
	import TopBar from "@/components/TopBar";
	import SlideBanner from "@/components/SlideBanner";
	import MangaList from "@/components/MangaList";
	import SlideList from "@/components/SlideList.vue";
	import { getRandomList, getHotList } from "@/api/index";

	export default {
		name: "Home",
		components: {
			TopBar,
			SlideBanner,
			MangaList,
			SlideList,
		},
		data() {
			return {
				getRandomList,
				hotMangas: [],
			};
		},
		mounted() {
			getHotList().then((res) => {
				this.hotMangas = this.$fillList(res.data, ".mh-item");
			});
		},
		methods: {},
	};
</script>
<style lang="less">
	@import url("@/layout/layout.less");
	.center {
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.5),
			rgba(0, 0, 0, 0.15) 90%,
			transparent
		);
	}
	.title-box .box {
		img {
			width: 0.375rem;
			height: auto;
			margin: 0 10px;
		}
	}
	.hot-box {
		.title-box {
			background: none !important;
		}
		background: linear-gradient(
			180deg,
			rgba(220, 9, 20, 0.5),
			rgba(220, 9, 20, 0)
		);
	}
	.hot-list {
		padding: 0.25rem 0;
		.rankNum {
			position: absolute;
			color: var(--color-white);
			font-size: 0.175rem;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.gap {
		height: 0.625rem;
	}

	.footer {
		font-size: 0.2rem;
		margin-top: 0.375rem 0;
		padding: 0.375rem 0;
		text-align: center;
	}
</style>

<style lang="less">
	.hot-box.mobile {
		.xsmallClass img {
			width: 1.8rem;
			height: 2.5rem;
		}
	}
</style>