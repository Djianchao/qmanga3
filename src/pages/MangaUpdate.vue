<template>
  <MangnList
    type="small2"
    title="最近更新"
    :api="getUpdateList"
    :init-page="2"
  />
</template>
<script>
import MangnList from '@/components/MangaList.vue'
import { getUpdateList } from '@/api/index'

export default {
    name: 'MangaUpdate',
    components: {
        MangnList
    },
    data() {
        return {
            getUpdateList
        }
    },
    mounted() {},
    methods: {}
}
</script>
<style lang="less" scoped>
</style>