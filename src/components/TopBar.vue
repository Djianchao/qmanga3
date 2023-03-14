<template>
	<div
		v-show="$route.name !== 'reader'"
		class="top-bar"
	>
		<img
			v-if="$store.state.settings.mode == 'mobile'"
			src="../assets/icons/buger.png"
			class="buger"
			:class="{fixBuger: isOpen}"
			@click="isOpen = !isOpen"
		>
		<div
			v-if="$store.state.settings.mode == 'pc'"
			class="links"
		>
			<router-link
				v-for="(link, index) in links"
				:key="index"
				:to="link.path"
			>
				{{ link.name }}
			</router-link>
		</div>
		<div
			v-else
			class="mobile menu"
			:class="{open: isOpen}"
		>
			<div class="mlinks">
				<a
					v-for="(link, index) in links"
					:key="index"
					@click.prevent="go(link.path)"
				>{{ link.name }}</a>
			</div>
		</div>
		<div class="search-box">
			<svg-icon
				name='search-icon'
				@click="search"
			/>
			<input
				v-model="keyWord"
				class="search"
				type="text"
				:placeholder="placeholder"
				@keydown.enter="search"
			>
		</div>
	</div>
</template>
<script>
	export default {
		name: "TopBar",
		data() {
			return {
				links: this.$store.state.settings.topBarLinks,
				placeholder: "搜索你喜欢的漫画 / 作者",
				keyWord: "",
				isOpen: false,
			};
		},
		methods: {
			search() {
				const keyWord = this.keyWord;
				this.$bus.$emit("search", keyWord);
				if (this.$route.name != "search") {
					this.$router.replace({
						name: "search",
						query: {
							keyWord,
						},
					});
				}
			},
			go(path) {
				let name = path.slice(1);

				if (!(name == this.$route.name)) {
					// 防止重复push相同的路由
					this.$router.push({
						name: path.slice(1),
					});
				}

				this.isOpen = false;
			},
		},
	};
</script>
<style lang="less" scoped>
	.top-bar {
		position: relative;
		z-index: 3;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 1.05rem;
		color: @small-white;
		background: linear-gradient(
			180deg,
			rgba(220, 9, 20, 0.5),
			@red 6%,
			rgba(0, 0, 0, 0.8) 0,
			rgba(220, 9, 20, 0)
		);
	}

	.top-bar .links {
		display: flex;
		align-items: center;
		margin-right: 0.5rem;
	}

	.links a,
	.mlinks a {
		display: inline-block;
		padding: 0.5rem 0;
		letter-spacing: 5px;
		color: inherit;
		font-size: 0.2rem;
		margin-right: 0.25rem;
		border-top: 0.0375rem solid transparent;
		transition: all 0.1s;
	}

	.links a:hover {
		color: @yellow;
		border-top: 0.0625rem solid @yellow;
		padding-bottom: 0.4625rem;
	}

	.search-box {
		position: relative;
		align-items: center;
	}

	.search-box svg {
		position: absolute;
		top: 50%;
		right: 8px;
		transform: translateY(-50%);
		width: 0.25rem;
		color: inherit;
		opacity: 0.8;
	}

	.search-box svg:hover {
		opacity: 1;
		top: 0;
		transform: scale(1.1);
	}

	.top-bar .search {
		float: right;
		display: block;
		width: 100%;
		color: inherit;
		outline: none;
		font-size: 0.175rem;
		border: 0;
		padding: 0.1rem 1rem 0.1rem 0.1rem;
		background-color: rgba(0, 0, 0, 0.5);
		border-bottom: 1px solid hsla(0, 0%, 100%, 0.3);
		transition: width 0.4s, border-color 0.4s;
	}

	.top-bar .search:focus {
		display: block;
		width: 110%;
		border-color: @red;
	}

	.mobile.menu {
		position: fixed;
		display: block;
		transform: translateX(-100%);
		width: 100%;
		top: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.8);
		border-top: 4px solid @red;
		height: 100%;
		background: linear-gradient(270deg, #5d0914 20%, rgba(93, 9, 20, 0));
		z-index: 3;
		.mlinks {
			display: flex;
			cursor: pointer;
			justify-content: flex-end;
		}
	}
	.buger {
		position: absolute;
		z-index: 999;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 0.8rem;
	}
	.open {
		transform: translateX(0) !important;
		transition: all 0.2s;
	}
	.fixBuger {
		position: fixed;
		top: 0;
		left: 0;
		transform: translateY(0);
	}
</style>