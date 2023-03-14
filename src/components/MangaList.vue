<template>
  <div>
    <Title
      v-if="showTitle"
      :title="title"
    />
    <div
      v-loading="{loading, fullScreen}"
      class="list"
    >
      <template v-for="(item, i) in list">
        <Manga
          :key="i"
          :info="item"
          :type="type"
        />
      </template>

      <div
        v-if="isScroll"
        class="hook"
      />
    </div>

    <div
      v-if="isBottom"
      class="bottom"
    >
      <p>
        我也是有底线的.....
      </p>
    </div>
  </div>
</template>
<script>
export default {
    name: 'MangaList',
    props: {
        showTitle: {
            type: Boolean,
            default: true
        },
        api: {
            // 获取数据的接口，必传
            type: Function,
            required: true
        },
        initPage: {
            // 初始化请求拿多少页数据
            type: Number,
            default: 1
        },
        title: {
            type: String,
            default: '随机推荐'
        },
        // 是否可以滚动
        isScroll: {
            type: Boolean,
            default: true
        },
        // 漫画卡片类型，默认是中等大小的漫画卡片
        type: {
            type: String,
            default: 'middle'
        },
        fullScreen: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            loading: true,
            list: [],
            pageLock: false,
            page: this.initPage,
            isBottom: false
        }
    },
    mounted() {
        this.getInitData()
        if (this.isScroll) {
            window.addEventListener('scroll', this.handleScroll)
        }
    },
    activated() {
        // 如果该列表是可以滚动的，则重新加上滚动事件
        if (this.isScroll) {
            window.addEventListener('scroll', this.handleScroll)
        }
    },
    deactivated() {
        console.log('clear handleScroll')
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        // 加载初始数据
        getInitData() {
            this.loading = true
            for (let i = 1; i <= this.initPage; i++) {
                this.api(i).then(res => {
                    this.list = this.list.concat(this.$fillList(res.data, '.mh-item'))
                    this.loading = false
                })
            }

            // 当前不是主页，则判断是否到达了底部，是的话自动加载下一页
            if (!this.isHome()) {
                if (this.isVisible()) {
                    this.api(++this.page).then(res => {
                        this.loading = false
                        this.list = this.list.concat(this.$fillList(res.data, '.mh-item'))
                    })
                }
            }
        },
        handleScroll() {
            if (this.isVisible()) {
                if (!this.pageLock) {
                    // 滚动到底部并且一页加载完后才加载下一页
                    this.page = this.page + 1
                    this.loading = true
                    this.pageLock = true // 上锁
                    this.api(this.page)
                        .then(res => {
                            this.list = this.list.concat(
                                this.$fillList(res.data, '.mh-item')
                            )
                            this.pageLock = false
                            this.loading = false
                        })
                        .catch(err => {
                            if (err.response.statusText == 'Internal Server Error') {
                                this.pageLock = true
                                this.isBottom = true
                            } else {
                                this.pageLock = false
                            }

                            this.loading = false
                        })

                    console.log('request data....')
                }
            }
        },
        isVisible() {
            let viewpoint = document.documentElement
            try {
                let rect = document.querySelector('.hook').getBoundingClientRect()
                return rect.top < viewpoint.clientHeight && rect.bottom > 0
            } catch {
                console.log('getBoundingClientRect catch....')
            }
        },
        getCategoryData() {
            this.list = []
            this.loading = true
            this.getInitData()
        },
        handleSearch() {
            console.log('handle search....')
            this.page = this.initPage
            this.list = []
            // this.mangas = [];
            this.getInitData()
        },
        isHome() {
            // 判断是否当前路由是否为主页
            return this.$route.path == '/home' || this.$route.path == '/'
        }
    }
}
</script>
<style lang="less" scoped>
	.list {
		display: grid;
		/* 列宽至少是 170px 有空余空间则等分 */
		grid-template-columns: repeat(auto-fill, minmax(2.125rem, 1fr));
		gap: 0.125rem;
		min-height: 5rem;
		padding: 10px 0.25rem;
		.item {
			width: 100%;
			height: 100px;
			background-color: blueviolet;
		}
	}
	.bottom {
		padding: 0.25rem;
		font-size: 0.1875rem;
		text-align: center;
	}
</style>