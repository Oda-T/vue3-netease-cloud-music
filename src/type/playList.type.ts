export type playListInt = {
  name: string
  id: string
  artist: string
  artistUrl: string
  imgUrl: string
  time: string
}

export type headerDetailInt = {
  name: string
  coverImgUrl: string
  category?: string
  likedCount?: number
  trackCount?: number
  shareCount?: number
  commentCount?: number
  subscribedCount?: number
  updateTime?: string
  desc?: string
  description?: string
  album?: string
  albumId?: number
  playCount?: number
  artistName?: string
  artistId?: number
  tags?: Array<string>
}
