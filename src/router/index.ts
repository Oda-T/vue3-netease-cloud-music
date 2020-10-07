import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'discover' },
    component: Layout,
    children: [
      {
        path: 'discover',
        component: () => import(/* webpackChunkName: "discover" */ '@/views/discover/index.vue'),
        name: 'discover'
      },
      {
        path: 'discover/toplist',
        component: () => import(/* webpackChunkName: "toplist" */ '@/views/discover/toplist.vue'),
        name: 'toplist'
      },
      {
        path: 'discover/playlist',
        component: () => import(/* webpackChunkName: "playlist" */ '@/views/discover/playlist.vue'),
        name: 'playlist'
      },
      {
        path: 'discover/djradio',
        component: () => import(/* webpackChunkName: "djradio" */ '@/views/discover/djradio.vue'),
        name: 'djradio'
      },
      {
        path: 'discover/artist',
        component: () => import(/* webpackChunkName: "artist" */ '@/views/discover/artist.vue'),
        name: 'artist'
      },
      {
        path: 'discover/album',
        component: () => import(/* webpackChunkName: "album" */ '@/views/discover/album.vue'),
        name: 'album'
      },
      {
        path: 'my',
        component: () => import(/* webpackChunkName: "my" */ '@/views/my/index.vue'),
        name: 'my'
      },
      {
        path: 'friend',
        component: () => import(/* webpackChunkName: "friend" */ '@/views/friend/index.vue'),
        name: 'friend'
      },
      {
        path: 'store',
        component: () => import(/* webpackChunkName: "store" */ '@/views/store/index.vue'),
        name: 'store'
      },
      {
        path: 'creator',
        component: () => import(/* webpackChunkName: "creator" */ '@/views/creator/index.vue'),
        name: 'creator'
      },
      {
        path: 'nmusician',
        component: () => import(/* webpackChunkName: "nmusician" */ '@/views/nmusician/index.vue'),
        name: 'nmusician'
      },
      {
        path: 'download',
        component: () => import(/* webpackChunkName: "download" */ '@/views/download/index.vue'),
        name: 'download'
      },
      {
        path: 'song',
        component: () => import(/* webpackChunkName: "song" */ '@/views/song/index.vue'),
        name: 'song'
      },
      {
        path: 'album',
        component: () => import(/* webpackChunkName: "album" */ '@/views/album/index.vue'),
        name: 'album'
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'discover' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
