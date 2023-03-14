<template>
  <MangnList
    ref="list"
    type="small2"
    :title="`${title}-相关搜索结果`"
    :init-page="2"
    :api="getSearchList"
  />
</template>
<script>
import MangnList from '@/components/MangaList.vue'
import { getSearchList } from '@/api/index'

export default {
    name: 'Search',
    components: {
        MangnList
    },
    data() {
        return {
            title: this.$route.query.keyWord
        }
    },
    mounted() {
        // topBar 组件的搜索框发出 search 事件通知 Search组件更新数据
        if (this.$bus) {
            this.$bus.$on('search', this.search)
        }
    },
    methods: {
        getSearchList(page) {
            return getSearchList(this.title, page)
        },
        search(keyWord) {
            console.log('set title...', keyWord)
            this.title = keyWord
            // 拿到新的搜索关键字后 调用 MangaList 子组件的handleSearch进行刷新加载新的数据
            this.$refs.list.handleSearch()
        }
    }
}
</script>
<style lang="less" scoped>
</style>