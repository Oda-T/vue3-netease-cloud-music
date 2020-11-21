import * as DISCOVER_INDEX from './discover/index'
import * as DISCOVER_ALBUM from './discover/album'
import * as DISCOVER_ARTIST from './discover/artist'
import * as DISCOVER_DJRADIO from './discover/djradio'
import * as DISCOVER_PLAYLIST from './discover/playlist'
import * as DISCOVER_TOPLIST from './discover/toplist'

import * as PLAYLIST_INDEX from './playlist/index'

import * as ALBUM_INDEX from './album/index'

import * as ARTIST_INDEX from './artist/index'

import * as SONG_INDEX from './song/index'

import * as DJRADIO_INDEX from './djradio/index'

import * as DJ_INDEX from './dj/index'

import * as MV_INDEX from './mv/index'

import * as VIDEO_INDEX from './video/index'

import * as USER_HOME from './user/home'
import * as USER_SETTING from './user/setting'

import * as MY_INDEX from './my/index'

// utils usePlayListHeader
const SHARE_RESOURCE = '/share/resource'

const PLAYLIST_SUBSCRIBE = '/playlist/subscribe'

const ALBUM_SUB = '/album/sub'

const DJ_SUB = '/dj/sub'

const MV_SUB = '/mv/sub'

const VIDEO_SUB = '/video/sub'

const RESOURCE_LIKE = '/resource/like'
// 评论
const COMMENT = '/comment'
// 点赞评论
const COMMENT_LIKE = '/comment/like'

type REQUEST_NAME = {
  [key: string]: string
}

const REQUEST_NAME: REQUEST_NAME = {
  ...DISCOVER_INDEX,
  ...DISCOVER_ALBUM,
  ...DISCOVER_ARTIST,
  ...DISCOVER_DJRADIO,
  ...DISCOVER_PLAYLIST,
  ...DISCOVER_TOPLIST,
  ...PLAYLIST_INDEX,
  ...ALBUM_INDEX,
  ...ARTIST_INDEX,
  ...SONG_INDEX,
  ...DJRADIO_INDEX,
  ...DJ_INDEX,
  ...MV_INDEX,
  ...VIDEO_INDEX,
  ...USER_HOME,
  ...USER_SETTING,
  ...MY_INDEX,
  SHARE_RESOURCE,
  PLAYLIST_SUBSCRIBE,
  ALBUM_SUB,
  DJ_SUB,
  MV_SUB,
  VIDEO_SUB,
  RESOURCE_LIKE,
  COMMENT,
  COMMENT_LIKE
}

export default REQUEST_NAME
