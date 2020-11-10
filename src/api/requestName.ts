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

import * as USER_INDEX from './user/index'

import * as MY_INDEX from './my/index'

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
  ...USER_INDEX,
  ...MY_INDEX
}

export default REQUEST_NAME
