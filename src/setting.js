// 存放一些全局设置和静态配置数据
let settings = {
    topBarLinks: [
        {
            name: '最近更新',
            path: '/update'
        },
        {
            name: '主页',
            path: '/home'
        },
        {
            name: '漫画分类',
            path: '/category'
        },
        {
            name: '我的收藏',
            path: '/favorited'
        }
    ],
    banners: [
        {
            href: '/577bz',
            src: './assets/banners/11.jpg',
            name: '电锯人'
        },
        {
            href: '/266bz',
            src: './assets/banners/22.jpg',
            name: '咒术回战'
        },
        {
            href: '/19523bz',
            src: './assets/banners/33.jpg',
            name: '蓝箱'
        },
        {
            href: '/5519bz',
            src: './assets/banners/44.jpg',
            name: '我推的孩子'
        }
    // {
    //   href: "/868bz",
    //   src: `./assets/banners/44.jpeg`,
    //   name: "夏日重现",
    // },
    // {
    //   href: "/10917bz",
    //   src: `./assets/banners/55.jpg`,
    //   name: "怪兽8号",
    // },
    ],
    categoryMenu: [
        {
            type: '题材',
            values: [
                { title: '全部', num: 0, active: true },
                { title: '热血', num: 31, active: false },
                { title: '冒险', num: 2, active: false },
                { title: '校园', num: 1, active: false },
                { title: '恋爱', num: 26, active: false },
                { title: '科幻', num: 25, active: false },
                { title: '生活', num: 11, active: false },
                { title: '悬疑', num: 17, active: false },
                { title: '魔法', num: 15, active: false },
                { title: '运动', num: 34, active: false }
            ]
        },
        {
            type: '状态',
            values: [
                {
                    title: '全部',
                    num: 0,
                    active: true
                },
                {
                    title: '连载中',
                    num: 1,
                    active: false
                },
                {
                    title: '完结',
                    num: 2,
                    active: false
                }
            ]
        },
        {
            type: '排序',
            values: [
                {
                    title: '人气',
                    num: 10,
                    active: true
                },
                {
                    title: '更新时间',
                    num: 2,
                    active: false
                }
            ]
        }
    ],
    // 分辨率宽度 大于768px则是PC端，小于768px 则为移动端
    mode: 'pc'
}

export default settings