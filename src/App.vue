<template>
	<div>
		<header>
			<TopBar />
		</header>

		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>

	</div>
</template>
<script>
	import TopBar from "@/components/TopBar";

	export default {
		components: {
			TopBar,
		},
		mounted() {
			// 设置本地缓存，用来缓存已收藏的漫画
			if (!localStorage.getItem("favorites")) {
				localStorage.setItem("favorites", JSON.stringify({}));
			}
			window.onresize = () => {
				this.$store.commit("settings/setMode", document.body.clientWidth);
			};
			window.onresize();
		},
	};
</script>
<style lang="less">
	body {
		font-family: sans-serif;
		background-color: @black !important;
		color: @white;
		height: 100%;
		min-height: 100%;
		max-width: 100%;
		line-height: 1;
	}
</style>