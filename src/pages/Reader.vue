<template>
  <div>
    <div class="read-box">
      <div
        ref="view"
        class="view-box"
        @click.left="hiddenMask = !hiddenMask"
        @click.right.prevent="rightClick"
      >
        <div
          v-for="(n, index) in info.num"
          :key="index"
          class="img-box"
          :class="{mobile: $store.state.settings.mode == 'mobile'}"
          @click="refresh(n)"
        >
          <img>
          <Loading class="load" />
          <p
            style="display: none"
            class="error"
          >
            加载失败.... 点我重新加载此页
          </p>
          <span>第 {{ n }} 页 </span>
        </div>
      </div>
      <div
        class="top-mask"
        :class="{ hidden: hiddenMask }"
      >
        <div class="title-box">
          <p>{{ info.title }}</p>
        </div>
      </div>
      <div
        class="bottom-mask"
        :class="{ hidden: hiddenMask }"
      >
        <p class="pageNum">共 {{ info.num || "NaN" }} 页</p>
        <button
          :disabled="!next"
          @click="handleClick(next)"
        >
          下 1 话
        </button>
        <button
          :disabled="!prev"
          @click="handleClick(prev)"
        >
          上 1 话
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { getManga, getDeatil } from '@/api/index'

export default {
    name: 'Reader',
    data() {
        return {
            hiddenMask: false,
            info: {
                name: '',
                title: '',
                num: 0
            },
            next: undefined, // 下一话链接
            prev: undefined, // 上一话链接
            page: 3, // 第几张图片
            slideOffset: 0 // 滚动的距离
        }
    },
    mounted() {
        this.fillInfo().then(() => {
            // 一开始先取3张图片
            for (let i = 1; i <= this.page; i++) {
                this.getMangaImg(i)
            }
        })
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        rightClick() {
            return
        },
        getMangaImg(page) {
            const cid = this.$route.params.cid.slice(1)
            const mid = this.$route.params.mid
            const params = {
                cid,
                mid: mid.slice(0, mid.length - 2),
                page
            }
            if (page > this.info.num) {
                return
            } else {
                let loading, p
                try {
                    loading = this.$refs.view.children[page - 1].children[1]
                    p = loading.nextElementSibling
                    loading.style = 'display: normal'
                    p.style = 'display: none'
                } catch (err) {
                    console.log(err)
                }
                getManga(params)
                    .then(res => {
                        this.showImg(res, page).then(() => {
                            loading.style = 'display: none'
                        })
                    })
                    .catch(() => {
                        loading.style = 'display: none'
                        p.style = 'display: normal'
                        // console.log(err);
                    })
            }
        },
        showImg(imgData, index) {
            return new Promise(resolve => {
                // 把传来的arraybuffer 转成图片数据进行显示
                var blob = new Blob([imgData.data], { type: 'ArrayBuffer' })
                var imageUrl = (window.URL || window.webkitURL).createObjectURL(blob)
                try {
                    const img = this.$refs.view.childNodes[index - 1].firstChild
                    img.src = imageUrl
                    img.onload = function() {
                        resolve()
                    }
                } catch {
                    console.log('err catch....')
                }
            })
        },
        fillInfo() {
            const id = this.$route.params.cid

            return new Promise((resolve, reject) => {
                getDeatil(id)
                    .then(res => {
                        const root = this.$parse(res.data)
                        this.info.title = root.querySelector('.top-title').innerText
                        this.info.num = parseInt(
                            root.querySelector('.bottom-page2').innerText.split('-')[1]
                        )

                        // 拿到上一话，下一话的链接数据
                        const container = root.querySelectorAll('.container')[1].firstChild
                        this.prev = container.firstChild.attrs.href.split('/')[1]
                        this.next = container.lastChild.attrs.href.split('/')[1]
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        handleClick(link) {
            const params = {
                cid: link,
                mid: this.$route.params.mid
            }
            this.$router.replace({
                name: 'reader',
                params: {
                    ...params
                }
            })
            window.location.reload()
        },
        handleScroll() {
            let viewpoint = document.documentElement
            // 每滚动1481 px 就加载下一张图片
            if (viewpoint.scrollTop - this.slideOffset > 1481 * 0.5) {
                this.slideOffset = viewpoint.scrollTop
                this.getMangaImg(++this.page)
            }
        },
        refresh(n) {
            this.getMangaImg(n)
        }
    }
}
</script>
<style lang="less" scoped>
	.read-box {
		height: 100%;
		font-size: 0.175rem;
		overflow-y: auto;
		.top-mask,
		.bottom-mask {
			position: fixed;
			left: 0;
			transition: height 0.3s;
		}
		.top-mask {
			width: 100vw;
			height: 1.5rem;
			display: flex;
			top: 0;
			align-items: center;
			padding: 0 0.75rem;
			background: linear-gradient(
				180deg,
				#dc0914,
				#dc0914 6%,
				#000 0,
				rgba(220, 9, 20, 0)
			);

			h2 {
				font-size: 2rem;
				margin-bottom: 12px;
			}
		}
		.bottom-mask {
			height: 0.75rem;
			width: 100%;
			bottom: 0;
			padding: 0 0.25rem;
			background: linear-gradient(
				0deg,
				#dc0914,
				#dc0914 8%,
				#000 0,
				rgba(220, 9, 20, 0)
			);
			button {
				font-size: 0.175rem;
				float: right;
				margin-left: 0.25rem;
			}
			p {
				margin-left: 0.25rem;
				padding: 5px 0;
				float: right;
				color: @small-white;
				span {
					color: @white;
					font-weight: bolder;
				}
			}
		}
		.view-box {
			padding-bottom: 0.5rem;
		}
		.img-box {
			padding-top: 0.375rem;
			height: auto;
			margin: 0 auto;
			width: 60%;
			min-height: 6.25rem;
			overflow: hidden;
			position: relative;

			span {
				display: block;
				text-align: center;
			}

			img {
				display: block;
				width: 100%;
				height: auto;
				margin-bottom: 10px;
			}

			.box {
				width: 100%;
				// position: absolute;
			}
		}

		.mobile.img-box {
			width: 100%;
		}

		.hidden {
			height: 0;
			p {
				display: none;
			}
		}
		.error {
			height: 6.25rem;
			padding: 1.5rem;
			text-align: center;
		}
	}
</style>