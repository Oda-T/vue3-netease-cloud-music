export type playListInt = {
  name: string;
  id: string;
  artist: string;
  artistUrl: string;
  imgUrl: string;
  time: number;
}

export type headerDetailInt = {
  name: string;
  coverImgUrl: string;
  category?: string;
  liked?: boolean;
  likedCount?: number;
  trackCount?: number;
  shareCount?: number;
  subscribedCount?: number;
  updateTime?: number;
  desc?: string;
  description?: string;
  album?: string;
  albumId?: number;
  playCount?: number;
  artistName?: string;
  artistId?: number;
  userName?: string;
  userId?: number;
  tags?: Array<string>;
  subscribed?: boolean;
  disabled?: boolean;
}
