import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import MangaDetail from '@/pages/MangaDetail'
import MangaUpdate from '@/pages/MangaUpdate'
import MangaCategory from '@/pages/MangaCategory'
import Favorited from '@/pages/Favorited'
import Reader from '@/pages/Reader'
import Search from '@/pages/Search'

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: MangaDetail
        },
        {
            path: '/update',
            name: 'update',
            component: MangaUpdate,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/category',
            name: 'category',
            component: MangaCategory,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/favorited',
            name: 'favorited',
            component: Favorited
        },
        {
            path: '/reader/:cid/:mid',
            name: 'reader',
            component: Reader
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
            meta: {
                keepAlive: true
            }
        }
    ]
})

export default router