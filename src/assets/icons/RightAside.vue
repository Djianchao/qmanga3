<template>
  <aside>
    <div class="ad" />
    <div class="hottest">
      <header>
        <Title :right="false">
          <div slot="left" class="box">
            <img src="../asset/hot.svg" alt>
            <h2>{{ title }}</h2>
          </div>
        </Title>
      </header>
      <div class="hot-list">
        <Manga
          v-for="(manga, index) in mangas"
          :key="index"
          type="xsmall"
          :info="manga"
        >
          <div slot="rank" class="rank">
            <img v-if="index < 3" :src="'../asset/rank' + index + '.png'">
            <span v-else class="rankNum"> {{ index + 1 }}</span>
          </div>
        </Manga>
      </div>
    </div>
  </aside>
</template>

<script>
import Title from './Title.vue'
import Manga from './Manga.vue'
export default {
    name: 'RightAside',
    components: {
        Title,
        Manga
    },
    props: ['mangas'],
    data() {
        this.title = '随机热门'
        return {}
    }
}
</script>

<style lang="less" scoped>
	.hottest {
		background: linear-gradient(
			180deg,
			rgba(220, 9, 20, 0.5),
			rgba(220, 9, 20, 0)
		);
		.rankNum {
			position: absolute;
			color: var(--color-white);
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	header {
		height: 80px;
		margin-bottom: 10px;
		.box {
			background: linear-gradient(
				90deg,
				rgba(220, 9, 20, 0.5),
				rgba(220, 9, 20, 0)
			) !important;
		}
	}
	header img {
		width: 28px;
		height: auto;
		margin: 0 10px;
	}
</style>