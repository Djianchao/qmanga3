<template>
  <a @click.prevent="goDetail(info.href)">
    <div
      class="wrapper"
      :class="classObj"
    >
      <div :style="type == 'xsmall' ? 'position:relative' : ''">
        <img
          :src="info.src"
          alt
        >
        <slot name="rank" />
      </div>
      <div
        v-if="isTitle"
        class="title-box"
      >
        <h3>{{ info.name }}</h3>
        <p>
          <span>{{ info.state }}</span>
          <a
            v-if="false"
            :href="info.new"
          >{{ info.title }}</a>
        </p>
      </div>
    </div>
  </a>
</template>
<script>
export default {
    name: 'Manga',
    props: {
        isTitle: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: 'middle'
        },
        info: {
            type: Object,
            required: true
        }
    },
    computed: {
        classObj() {
            return (this.type === 'middle' ? 'bb ' : '') + this.type + 'Class'
        }
    },
    methods: {
        goDetail(href) {
            // console.log(href);
            this.$router.push({
                name: 'detail',
                params: {
                    id: href.split('/')[1]
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
	.wrapper {
		width: 100%;
		position: relative;
		cursor: pointer;

		img {
			width: 100%;
			transition: all 0.2s;
		}
		.title-box {
			position: absolute;
			background: linear-gradient(0deg, #000 25%, transparent);
			left: 0;
			bottom: 0;
			width: 100%;
			height: 28%;
			padding-left: 10px;
			letter-spacing: 2px;
			transition: height 0.3s;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
		}
		h3 {
			font-size: 0.175rem;
			line-height: 2;
			color: @white;
			transition: color 0.3s;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		p {
			font-size: small;
			transition: all 0.3s;
			color: @small-white;
			padding-bottom: 15px;
		}
		&:hover {
			p {
				color: @white;
			}
			h3 {
				color: @yellow;
			}
		}
	}

	.middleClass {
		&:hover .title-box {
			height: 36%;

			p {
				padding-bottom: 0.375rem;
			}
		}
		img {
			width: 100%;
			height: 3.5625rem;

			// @media screen and (max-width: 1280px) {
			// 	height: 260px;
			// }
			// @media screen and (max-width: 768px) {
			// 	height: 290px;
			// }

			object-fit: cover;
		}
	}

	.smallClass,
	.small2Class {
		transition: all 0.2s;
		.title-box {
			position: static;
			width: 100%;
			display: block;
			background: none;
			padding-left: 0;
		}
		&:hover {
			transform: translateY(-10px);
			opacity: 0.8;
		}
		img {
			width: 100%;
			height: 2.75rem !important;
			object-fit: cover;
		}
	}
	.small2Class {
		img {
			height: 3.2rem !important;
		}
	}

	.bigClass {
		background: linear-gradient(180deg, #000, transparent);
		padding: 20px;
		max-width: 325px;
		border-radius: 10px;
		transition: background 0.3s;
		&:hover {
			background: linear-gradient(180deg, #5d0914, rgba(93, 9, 20, 0));
			.rank img {
				border-left: 5px solid #ffd600;
				transition: border-left 0.1s;
			}
		}
		.title-box {
			width: auto;
			float: left;
		}
		.rank img {
			width: auto;
			display: inline-block;
			height: 50px;
			line-height: 35px;
			font-size: 20px;
			background: linear-gradient(90deg, #000, transparent);
			text-align: left;
			padding: 10px 50px 10px 10px;
		}
	}

	.xsmallClass {
		display: flex;
		align-items: center;
		background: none;
		transition: all 0s;
		padding: 20px 20px 10px 20px;
		p,
		img,
		h3 {
			transition: none;
		}
		img {
			width: 0.875rem;
			height: 1.3125rem;
			opacity: 0.8;
			object-fit: cover;
		}

		.title-box {
			position: static;
			background: none;
			display: block;
		}
		.rank {
			float: none;
			position: absolute;
			left: 50%;
			width: 0.375rem;
			height: 0.375rem;
			top: 0;
			border-radius: 50%;
			background-color: black;
			transform: translate(-50%, -50%);
			img {
				display: block;
				width: auto;
				margin: 0 auto;
				height: 0.3125rem;
			}
		}
		.num {
			position: absolute;
			bottom: 16%;
			transform: translateX(125%);
		}
		&:hover {
			background: linear-gradient(90deg, rgba(0, 0, 0, 0.2), transparent);
			opacity: 1;
			> img {
				opacity: 1;
			}
		}
	}

	.xsmallClass,
	.bigClass {
		.num {
			color: @white;
			float: right;
		}
		.num img {
			width: 12px;
			height: auto;
			padding-top: 20px;
		}
	}

	.bb {
		border-bottom: 1px solid @small-white;
	}
</style>