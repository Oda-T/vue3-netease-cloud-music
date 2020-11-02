export type commentsInt = {
  username: string
  useravatar: string
  content: string
  linked: boolean
  likedcount: number
  time: string
  usertype: number
  replied: {
    username: string | undefined
    content: string | undefined
  }
}