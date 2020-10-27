import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'discover' },
    component: Layout,
    children: [
      {
        path: '',
        alias: 'discover',
        component: () => import(/* webpackChunkName: "discover" */ '@/views/discover/index.vue'),
        name: 'discover',
        meta: {
          title: '发现音乐',
          subtitle: '推荐',
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
          childindex: 5
        }
      },
      {
        path: 'my',
        component: () => import(/* webpackChunkName: "my" */ '@/views/my/index.vue'),
        name: 'my',
        meta: {
          title: '我的音乐',
          index: 1
        }
      },
      {
        path: 'friend',
        component: () => import(/* webpackChunkName: "friend" */ '@/views/friend/index.vue'),
        name: 'friend',
        meta: {
          title: '朋友',
          index: 2
        }
      },
      {
        path: 'store',
        component: () => import(/* webpackChunkName: "store" */ '@/views/store/index.vue'),
        name: 'store',
        meta: {
          title: '商城',
          index: 3
        }
      },
      {
        path: 'store/newalbum/detail',
        component: () => import(/* webpackChunkName: "storeNewalbum" */ '@/views/store/index.vue'),
        name: 'storeNewalbum',
        meta: {
          title: '商城',
          index: 3
        }
      },
      {
        path: 'nmusician',
        component: () => import(/* webpackChunkName: "nmusician" */ '@/views/nmusician/index.vue'),
        name: 'nmusician',
        meta: {
          title: '音乐人',
          index: 4
        }
      },
      {
        path: 'nmusician/:id',
        component: () => import(/* webpackChunkName: "nmusician" */ '@/views/nmusician/index.vue'),
        name: 'nmusicianId',
        meta: {
          title: '音乐人',
          index: 4
        }
      },
      {
        path: 'download',
        component: () => import(/* webpackChunkName: "download" */ '@/views/download/index.vue'),
        name: 'download',
        meta: {
          title: '下载客户端',
          index: 5
        }
      },
      {
        path: 'creator',
        component: () => import(/* webpackChunkName: "creator" */ '@/views/creator/index.vue'),
        name: 'creator',
        meta: {
          title: '创作者中心'
        }
      },
      {
        path: 'song',
        component: () => import(/* webpackChunkName: "song" */ '@/views/song/index.vue'),
        name: 'song',
        meta: {
          title: 'song'
        }
      },
      {
        path: 'dj',
        component: () => import(/* webpackChunkName: "dj" */ '@/views/dj/index.vue'),
        name: 'dj',
        meta: {
          title: 'DJ'
        }
      },
      {
        path: 'artist',
        component: () => import(/* webpackChunkName: "artist" */ '@/views/artist/index.vue'),
        name: 'artist',
        meta: {
          title: 'artist'
        }
      },
      {
        path: 'playlist',
        component: () => import(/* webpackChunkName: "playlist" */ '@/views/playlist/index.vue'),
        name: 'playlist',
        meta: {
          title: 'playlist'
        }
      },
      {
        path: 'album',
        component: () => import(/* webpackChunkName: "album" */ '@/views/album/index.vue'),
        name: 'albumNew',
        meta: {
          title: 'album'
        }
      },
      {
        path: 'album/:id',
        component: () => import(/* webpackChunkName: "album" */ '@/views/album/index.vue'),
        name: 'album',
        meta: {
          title: 'album'
        }
      },
      {
        path: 'topic',
        component: () => import(/* webpackChunkName: "topic" */ '@/views/topic/index.vue'),
        name: 'topic',
        meta: {
          title: 'topic'
        }
      },
      {
        path: 'm/at/:id',
        component: () => import(/* webpackChunkName: "album" */ '@/views/m/at.vue'),
        name: 'at',
        meta: {
          title: 'm/at'
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
