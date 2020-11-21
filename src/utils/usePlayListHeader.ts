import store from '../store/index'
import request from '../api/index'
import mdui from 'mdui'

export const handlePlay: (list: string | Array<string>) => void = songList => {
  store.commit('setSongList', songList)
  mdui.snackbar({
    message: '已添加到播放列表',
    position: 'right-bottom',
    timeout: 1200
  })
}

export const handleShare: (id: string, type?: string, msg?: string) => void = async (id, type, msg) => {
  const { code } = await request['httpGET']('SHARE_RESOURCE', { 'id': id, 'type': type, 'msg': msg })
  code === 200
    ? mdui.snackbar({
        message: '成功分享到动态',
        position: 'right-bottom',
        timeout: 1200
      })
    : mdui.snackbar({
        message: '分享失败',
        position: 'right-bottom',
        timeout: 1200
      })
}

const getSubUrl: (s: string) => string = s => {
  switch (s) {
    case 'playlist':
      return 'PLAYLIST_SUBSCRIBE'

    case 'album':
      return 'ALBUM_SUB'

    case 'djradio':
      return 'DJ_SUB'

    case 'mv':
      return 'MV_SUB'

    case 'video':
      return 'VIDEO_SUB'

    default:
      return 'PLAYLIST_SUBSCRIBE'
  }
}

const getId: (s: string) => string = s => {
  switch (s) {
    case 'djradio':
      return 'rid'

    case 'mv':
      return 'mvid'

    default:
      return 'id'
  }
}

export const handleSubscribe: (id: string, type: string) => void = async (id, type) => {
  const { code } = await request['httpGET'](getSubUrl(type), { [getId(type)]: id, t: 1 })

  code === 200
    ? mdui.snackbar({
        message: '收藏成功',
        position: 'right-bottom',
        timeout: 1200
      })
    : mdui.snackbar({
        message: '收藏失败',
        position: 'right-bottom',
        timeout: 1200
      })
}

const getType: (s: string) => string = s => {
  switch (s) {
    case 'djprogram':
      return '4'

    case 'video':
      return '5'

    default:
      return '1'
  }
}

export const handleLike: (id: string, type: string) => void = async (id, type) => {
  const { code } = await request['httpGET']('RESOURCE_LIKE', { id: id, t: 1, type: getType(type) })
  if (code === 200) {
    mdui.snackbar({
      message: '已点赞',
      position: 'right-bottom',
      timeout: 1200
    })
  }
}
