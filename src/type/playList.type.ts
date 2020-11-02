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
  description: string
  trackCount: number
  shareCount: number
  commentCount: number
  subscribedCount: number
  updateTime: string
  playCount?: number
  artistName?: string
  artistId?: number
  tags?: Array<string>
}
