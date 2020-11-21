import request from '../api/index'
import mdui from 'mdui'

export const useSendComments: (id: string, type: number, ctx: string) => Promise<void> = async (id, type, content) => {
  const { code } = await request['httpGET']('COMMENT', { t: 1, type: type, id: id, content: content })
  code === 200
    ? mdui.snackbar({
        message: '评论成功',
        position: 'right-bottom',
        timeout: 1200,
        onClose: function() {
          return Promise.resolve()
        }
      })
    : mdui.snackbar({
        message: '评论失败',
        position: 'right-bottom',
        timeout: 1200,
        onClose: function() {
          return Promise.reject()
        }
      })
}

export const useCommentsLike: (id: string, type: number, cid: number) => Promise<void> = async (id, type, cid) => {
  const { code } = await request['httpGET']('COMMENT_LIKE', { id: id, type: type, t: 1, cid: cid })
  if (code === 200) {
    return Promise.resolve()
  } else {
    return Promise.reject()
  }
}
