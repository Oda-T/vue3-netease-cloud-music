export type commentsInt = {
  username: string
  useravatar: string
  content: string
  liked: boolean
  likedcount: number
  time: number
  usertype: number
  replied: {
    username: string | undefined
    content: string | undefined
  }
}
