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
  playCount: number
  shareCount: number
  commentCount: number
  subscribedCount: number
  updateTime: string
  tags?: Array<string>
}
