<template>
  <div class="title-box">
    <div
      class="box"
      :style="`background:${bg};`"
    >
      <slot name="left">
        <h2>{{ title }}</h2>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
    name: 'Title',
    props: {
        title: String,
        btnText: String,
        bg: {
            type: String,
            default: 'linear-gradient(90deg, #000, transparent)'
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
	.title-box {
		height: 1.1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: linear-gradient(90deg, #000, transparent);
		.box {
			display: flex;
			align-items: center;
			width: auto;
			height: inherit;
			padding-left: 2%;
			padding-right: 10%;
		}

		h2 {
			font-size: 0.3rem;
		}

		a {
			display: inline-block;
			display: flex;
			align-items: center;
			color: var(--color-black);
			background-color: var(--color-yellow);
			letter-spacing: 2px;
			line-height: 2;
			padding: 0 10px;
			border-radius: 7px 0 0 7px;
			transition: all 0.2s;
			&::after {
				display: inline-block;
				content: "";
				width: 8px;
				height: 8px;

				border-top: 2px solid var(--color-black);
				border-right: 2px solid var(--color-black);
				transform: rotate(45deg);
				margin-left: 4px;
			}
			&:hover {
				padding: 0 15px;
				border-radius: 15px 0 0 15px;
			}
		}
	}
</style>