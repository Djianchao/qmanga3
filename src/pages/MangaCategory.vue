<template>
  <div>
    <!-- <HotManga /> -->
    <header>
      <div
        class="category"
        :class="{mobile: $store.state.settings.mode == 'mobile'}"
      >
        <div
          v-for="(b, index1) in bars"
          :key="index1"
          class="bar"
        >
          <span class="type">{{ b.type }}: </span>
          <a
            v-for="(val, index) in b.values"
            :key="index"
            :class="{ active: val.active }"
            @click="handleClick(index1, index, val.num)"
          >{{ val.title }}</a>
        </div>
      </div>
    </header>
    <MangaList
      ref="mlist"
      type="small2"
      :api="getCategoryListData"
      :show-title="false"
      :init-page="2"
    />
  </div>
</template>
<script>
import MangaList from '../components/MangaList.vue'
import { getList } from '../api/index'

const params = { type: 0, state: 0, sort: 10 }
export default {
    name: 'MangaCategory',
    components: {
        MangaList
    },
    data() {
        return {
            bars: this.$store.state.settings.categoryMenu
        }
    },
    mounted() {},
    methods: {
        handleClick(index1, index, num) {
            const a = this.bars[index1].values
            a.forEach(e => {
                e.active = false
            })

            if (index1 == 0) {
                params.type = num
            } else if (index1 == 1) {
                params.state = num
            } else {
                params.sort = num
            }
            a[index].active = true
            console.log(params)
            this.$refs.mlist.getCategoryData()
        },
        getCategoryListData(page) {
            // debugger;
            return getList(params, page)
        }
    }
}
</script>
<style lang="less" scoped>
	header {
		background: linear-gradient(90deg, #000, transparent);
		padding: 10px 0;
	}
	.category {
		width: 65%;
		margin: 0 auto;
		font-size: 0.175rem;
		span {
			color: @small-white;
		}
		a {
			cursor: pointer;
			padding: 0.0625rem 0.125rem 0.1rem 0.125rem;
			margin: 0 0.125rem;
			line-height: 3.5;
		}
	}
	.active {
		background-color: @red;
		border-radius: 0.1625rem;
	}
	.mobile.category {
		width: 90%;
	}
</style>