<template>
	<div v-loading.fullScreen="loading">
		<!-- <div class="bg-box">
			<img :src="bg" alt />
		</div> -->
		<div class="desc">
			<div class="left-box">
				<img
					:src="mangaInfo.cover"
					alt
				>
				<button
					:class="{ favorited: favorited }"
					@click="handleFvorite"
				>
					{{ favorited ? "已收藏" : "添加到收藏" }}
					<svg-icon :name="favorited ? 'check' : 'favorite'" />
				</button>
			</div>
			<div
				v-if="$store.state.settings.mode == 'pc'"
				class="summary-box"
			>
				<div class="info">
					<div>
						<h2 class="title">{{ mangaInfo.name }}</h2>
						<p class="book-author">{{ mangaInfo.author }}</p>
					</div>
					<span>状态:&nbsp; {{ mangaInfo.state }}</span>
					<span>题材:&nbsp; {{ mangaInfo.type }}</span>
				</div>
				<div class="summary">
					{{ mangaInfo.summary }}
				</div>
			</div>
		</div>
		<div
			class="chapter-list"
			:class="{mobile: $store.state.settings.mode == 'mobile'}"
		>
			<div class="top-box">
				<span>章节列表</span>

				<div @click="handleReverse()">
					<img
						v-if="reverse"
						src="../assets/icons/fu.png"
						alt
					>
					<img
						v-else
						src="../assets/icons/zhen.png"
						alt
					>
				</div>
			</div>
			<hr>
			<div class="new">
				<p>
					{{ mangaInfo.date }} &nbsp;<a href="">{{ mangaInfo.new }}</a>
				</p>
			</div>
			<div class="list">
				<div
					v-for="(book, index) in chapter"
					:key="index"
					class="list-item"
				>
					<a
						:x="book.href"
						@click="goReader(book.href)"
					>
						<p class="title">{{ book.title }}</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getDeatil } from "@/api/index";
	export default {
		name: "MangaDetail",
		data() {
			return {
				// bg: "",
				mangaInfo: {
					cover: "",
					name: "",
					author: "",
					summary: "",
					state: "",
					type: "",
					new: "",
					date: "",
				},
				loading: true,
				reverse: true,
				chapter: [],
				favorited: false,
			};
		},
		mounted() {
			const id = `/${this.$route.params.id}/`;
			this.favorited = !!JSON.parse(localStorage.getItem("favorites"))[id];
			getDeatil(id).then((res) => {
				const root = this.$parse(res.data);
				this.fillMangaInfo(
					root.querySelector(".detail-info-1 .container .detail-info")
				);
				this.fillSummary(
					root.querySelector(".detail-info-2 .detail-info-content")
				);
				this.fillState(root.querySelector(".detail-list-form-title"));
				this.fillChapter(root.querySelectorAll("#chapterlistload a"));

				this.loading = false;
			});
		},
		methods: {
			fillMangaInfo(data) {
				this.mangaInfo.cover = data.firstChild.attrs.src;
				this.mangaInfo.name = data.querySelector(".detail-info-title").innerText;
				const spans = data.querySelectorAll(".detail-info-tip span");
				this.mangaInfo.author = spans[0].lastChild.innerText;
				this.mangaInfo.state = spans[1].lastChild.innerText;
				const items = spans[3].querySelectorAll(".item");
				items.forEach((item) => {
					this.mangaInfo.type += item.innerText + " ";
				});
			},
			fillSummary(data) {
				this.mangaInfo.summary = data.innerText.replace(
					/\[\+\u5c55\u958b\] | \[-\u6298\u758a\]/,
					""
				);
			},
			fillState(data) {
				// this.mangaInfo.state = data.innerText;
				this.mangaInfo.date = data.childNodes[1].text;
				const s = data.querySelector(".s");
				this.mangaInfo.new = s.firstChild.innerText + " " + s.lastChild.innerText;
			},
			fillChapter(data) {
				let obj = {};
				data.forEach((a) => {
					obj.href = a.attrs.href;
					obj.title = a.innerText;
					this.chapter.push(obj);
					obj = {};
				});
			},
			handleReverse() {
				this.reverse = !this.reverse;
				this.chapter.reverse();
			},
			goReader(href) {
				const params = {
					cid: href.split("/")[1],
					mid: this.$route.params.id,
				};
				this.$router.push({
					name: "reader",
					params: {
						...params,
					},
				});
			},
			handleFvorite() {
				const id = `/${this.$route.params.id}/`;
				const book = {
					href: id,
					src: this.mangaInfo.cover,
				};
				const favorites = JSON.parse(localStorage.getItem("favorites"));
				if (this.favorited) {
					delete favorites[id];
					localStorage.setItem("favorites", JSON.stringify(favorites));
					this.favorited = false;
				} else {
					favorites[id] = book;
					// 放入本地缓存中
					localStorage.setItem("favorites", JSON.stringify(favorites));
					this.favorited = true;
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	// .bg-box {
	// 	position: fixed;
	// 	height: 100vh;
	// 	width: 100vw;
	// 	top: 0;
	// 	left: 0;
	// 	z-index: 1;
	// 	img {
	// 		width: 100%;
	// 		object-fit: cover;
	// 	}
	// 	opacity: 0.2;
	// }
	// .mask-box {
	// 	// position: absolute;
	// 	z-index: 4;
	// 	height: 400px;
	// 	background: linear-gradient(
	// 		0deg,
	// 		var(--color-black),
	// 		rgba(25, 25, 25, 0) 50%,
	// 		var(--color-black)
	// 	);
	// }
	.desc {
		position: relative;
		z-index: 3;
		display: flex;
		justify-content: center;
		// margin-top: -400px;
		min-height: 5rem;
		padding: 0 0.375rem;
	}
	.left-box {
		position: relative;
		z-index: 5;
		min-width: 3.125rem;
		max-width: 3.375rem;
		img {
			width: 100%;
			height: 4.025rem;
			border-radius: 6px;
			object-fit: cover;
		}
		button {
			display: block;
			position: relative;
			margin-top: 5px;
			width: 100%;
			height: 0.5625rem;
			color: @yellow;
			font-size: 0.2rem;
			letter-spacing: 0.125rem;
			border-radius: 5px;
			background-color: black;
			border: 1px solid @yellow;
			transition: 0.2s;
			&:hover {
				background-color: @yellow;
				font-size: 0.175rem;
				letter-spacing: 5px;
				color: black;
			}
		}
	}

	.summary-box {
		width: 100%;
		margin-left: 0.5rem;
	}
	.info {
		display: flex;
		font-size: 0.175rem;
		padding: 0.25rem 0;
		background: linear-gradient(90deg, #000, transparent);
		span {
			color: @small-white;
			margin-left: 10%;
		}
		h2 {
			padding-left: 0.375rem;
			font-size: 0.225rem;
		}
		p {
			font-size: 0.175rem;
		}
	}
	.book-author {
		padding: 0.125rem 0 0 0.375rem;
	}
	.summary {
		font-size: 0.2rem;
		text-indent: 2em;
		width: 80%;
		line-height: 1.5;
		margin-top: 0.5rem;
		color: @small-white;
	}

	.chapter-list {
		position: relative;
		z-index: 3;
		width: 75%;
		padding-left: 0.375remx;
		span {
			box-sizing: content-box;
			color: @small-white;
			font-size: 0.2rem;
			letter-spacing: 5px;
			padding-left: 0.25rem;
		}
		.list {
			width: 100%;
			font-size: 0.175rem;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 5px;
			p {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.list-item {
				text-align: center;
				padding: 0 15px;
				height: 80px;
				line-height: 80px;
				transition: all 0.2s;
				a {
					color: @small-white;
					transition: color 0.2s;
				}
				&:hover {
					background: linear-gradient(90deg, #000, transparent);
					a {
						color: @yellow;
					}
				}
			}
		}
	}
	.mobile.chapter-list {
		width: 100%;
	}
	hr {
		margin: 10px 0;
		padding: 0 30px;
		height: 0.5px;
		color: @small-white;
	}
	.top-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		img {
			width: 24px;
			height: auto;
			cursor: pointer;
		}
	}
	.new {
		text-align: center;
		padding: 10px 0 20px 0;
		a {
			color: red;
		}
	}
	button.favorited {
		color: @yellow;
		background: @dark-red;
		border: solid 1px @dark-red;
		transition: all 0.2s;
	}
	.svg-icon {
		position: absolute;
		top: 50%;
		right: 5%;
		transform: translateY(-50%);
	}
</style>