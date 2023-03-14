<template>
  <div class="favorite">
    <Title title="我的收藏" />
    <div class="wrapper">
      <div
        v-for="(info, index) in list"
        :key="index"
        class="box"
      >
        <Manga
          type="small"
          :info="info"
          :is-title="false"
        />
        <div
          v-if="list.length"
          class="bottom"
          @click="remove(info.href)"
        >
          取消收藏
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'Favorited',
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.getFavorites()
    },
    methods: {
        getFavorites() {
            const favorites = JSON.parse(localStorage.getItem('favorites'))
            const data = []
            // console.log(favorites);
            Object.keys(favorites).forEach(key => {
                data.push(favorites[key])
            })
            this.list = data
        },
        remove(id) {
            console.log(id)
            const favorites = JSON.parse(localStorage.getItem('favorites'))
            delete favorites[id]
            localStorage.setItem('favorites', JSON.stringify(favorites))
            this.getFavorites()
        }
    }
}
</script>
<style lang="less" scoped>
	.favorite {
		.wrapper {
			display: flex;
			padding: 10px 30px;
			flex-wrap: wrap;
			gap: 10px;

			.bottom {
				margin-top: 5px;
				background: linear-gradient(90deg, #000, transparent);
				cursor: pointer;
				padding: 10px 0 10px 10px;
				font-size: 0.175rem;
				letter-spacing: 2px;
				color: @small-white;
				transition: all 0.2s;
				&:hover {
					color: @red;
					border-left: 5px solid @red;
				}
			}
		}
	}
</style>
<style lang="less">
	.favorite {
		.box {
			&:hover {
				.smallClass {
					transform: translateY(-10px);
					opacity: 0.8;
				}
			}
		}
		.smallClass {
			padding: 0 !important;
		}
	}
</style>
