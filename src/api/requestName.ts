import * as DISCOVER_INDEX_REQUEST from './discover/index'
import * as DISCOVER_ALBUM_REQUEST from './discover/album'
import * as DISCOVER_ARTIST_REQUEST from './discover/artist'
import * as DISCOVER_DJRADIO_REQUEST from './discover/djradio'
import * as DISCOVER_PLAYLIST_REQUEST from './discover/playlist'
import * as DISCOVER_TOPLIST_REQUEST from './discover/toplist'

import * as PLAYLIST_INDEX from './playlist/index'

import * as ALBUM_INDEX from './album/index'

import * as ARTIST_INDEX from './artist/index'

import * as SONG_INDEX from './song/index'

type REQUEST_NAME = {
  [key: string]: string
}

const REQUEST_NAME: REQUEST_NAME = {
  ...DISCOVER_INDEX_REQUEST,
  ...DISCOVER_ALBUM_REQUEST,
  ...DISCOVER_ARTIST_REQUEST,
  ...DISCOVER_DJRADIO_REQUEST,
  ...DISCOVER_PLAYLIST_REQUEST,
  ...DISCOVER_TOPLIST_REQUEST,
  ...PLAYLIST_INDEX,
  ...ALBUM_INDEX,
  ...ARTIST_INDEX,
  ...SONG_INDEX
}

export default REQUEST_NAME
