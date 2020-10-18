import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'discover' },
    component: Layout,
    meta: {
      title: '发现音乐',
      subtitle: '推荐',
      index: -1,
      childindex: 0
    },
    children: [
      {
        path: '',
        alias: 'discover',
        component: () => import(/* webpackChunkName: "discover" */ '@/views/discover/index.vue'),
        name: 'discover',
        meta: {
          title: '发现音乐',
          subtitle: '推荐',
          index: -1,
          childindex: 0
        }
      },
      {
        path: 'discover/toplist',
        component: () => import(/* webpackChunkName: "toplist" */ '@/views/discover/toplist.vue'),
        name: 'discoverToplist',
        meta: {
          title: '发现音乐',
          subtitle: '排行榜',
          index: -1,
          childindex: 1
        }
      },
      {
        path: 'discover/playlist',
        component: () => import(/* webpackChunkName: "playlist" */ '@/views/discover/playlist.vue'),
        name: 'discoverPlaylist',
        meta: {
          title: '发现音乐',
          subtitle: '歌单',
          index: -1,
          childindex: 2
        }
      },
      {
        path: 'discover/djradio',
        component: () => import(/* webpackChunkName: "djradio" */ '@/views/discover/djradio.vue'),
        name: 'discoverDjradio',
        meta: {
          title: '发现音乐',
          subtitle: '主播电台',
          index: -1,
          childindex: 3
        }
      },
      {
        path: 'discover/artist',
        component: () => import(/* webpackChunkName: "artist" */ '@/views/discover/artist.vue'),
        name: 'discoverArtist',
        meta: {
          title: '发现音乐',
          subtitle: '歌手',
          index: -1,
          childindex: 4
        }
      },
      {
        path: 'discover/album',
        component: () => import(/* webpackChunkName: "album" */ '@/views/discover/album.vue'),
        name: 'discoverAlbum',
        meta: {
          title: '发现音乐',
          subtitle: '新碟上架',
          index: -1,
          childindex: 5
        }
      },
      {
        path: 'my',
        component: () => import(/* webpackChunkName: "my" */ '@/views/my/index.vue'),
        name: 'my',
        meta: {
          title: '我的音乐',
          subtitle: '',
          index: 1,
          childindex: -1
        }
      },
      {
        path: 'friend',
        component: () => import(/* webpackChunkName: "friend" */ '@/views/friend/index.vue'),
        name: 'friend',
        meta: {
          title: '朋友',
          subtitle: '',
          index: 2,
          childindex: -1
        }
      },
      {
        path: 'store/product',
        alias: 'store',
        component: () => import(/* webpackChunkName: "store" */ '@/views/store/product.vue'),
        name: 'store',
        meta: {
          title: '商城',
          subtitle: '',
          index: 3,
          childindex: -1
        }
      },
      {
        path: 'store/newalbum/detail',
        component: () => import(/* webpackChunkName: "store" */ '@/views/store/newalbum.vue'),
        name: 'storeNewalbum',
        meta: {
          title: '商城',
          subtitle: '新碟',
          index: 3,
          childindex: -1
        }
      },
      {
        path: 'creator',
        component: () => import(/* webpackChunkName: "creator" */ '@/views/creator/index.vue'),
        name: 'creator',
        meta: {
          title: '创作者中心',
          subtitle: '',
          index: -1,
          childindex: -1
        }
      },
      {
        path: 'nmusician',
        component: () => import(/* webpackChunkName: "nmusician" */ '@/views/nmusician/index.vue'),
        name: 'nmusician',
        meta: {
          title: '音乐人',
          subtitle: '',
          index: 4,
          childindex: -1
        }
      },
      {
        path: 'download',
        component: () => import(/* webpackChunkName: "download" */ '@/views/download/index.vue'),
        name: 'download',
        meta: {
          title: '下载客户端',
          subtitle: '',
          index: 5,
          childindex: -1
        }
      },
      {
        path: 'song',
        component: () => import(/* webpackChunkName: "song" */ '@/views/song/index.vue'),
        name: 'song',
        meta: {
          title: 'song',
          subtitle: '',
          index: -1,
          childindex: -1
        }
      },
      {
        path: 'dj',
        component: () => import(/* webpackChunkName: "dj" */ '@/views/dj/index.vue'),
        name: 'dj',
        meta: {
          title: 'DJ',
          subtitle: '',
          index: -1,
          childindex: -1
        }
      },
      {
        path: 'playlist',
        component: () => import(/* webpackChunkName: "playlist" */ '@/views/playlist/index.vue'),
        name: 'playlist',
        meta: {
          title: 'playlist',
          subtitle: '',
          index: -1,
          childindex: -1
        }
      },
      {
        path: 'album',
        component: () => import(/* webpackChunkName: "album" */ '@/views/album/index.vue'),
        name: 'album',
        meta: {
          title: 'album',
          subtitle: '',
          index: -1,
          childindex: -1
        }
      },
      {
        path: 'm/at/:id',
        component: () => import(/* webpackChunkName: "album" */ '@/views/m/at.vue'),
        name: 'at',
        meta: {
          title: 'm/at',
          subtitle: '',
          index: -1,
          childindex: -1
        }
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
