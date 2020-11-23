export const getDuoNum: (d: number) => string | number = d => {
  return d >= 10 ? d : `0${d}`
}

export const handleDrTime: (d: number) => string = d => {
  const _d = Math.floor(d / 1000)
  return `${Math.floor(_d / 60)}:${getDuoNum(Math.floor(_d % 60))}`
}
// 事件戳转字符串
export const handleTime: (d: number) => string = d => {
  const _d = new Date(d)
  return `${_d.getFullYear()}年${_d.getMonth() + 1}月${_d.getDate()}日`
}

// 字符串转时间戳
export const handleTimeStamp: (s: string) => string = s => {
  const d = new Date()
  const _y = s.split('年')[0]
  const _m = s.split('年')[1].split('月')[0]
  const _d = s.split('月')[1].split('日')[0]

  d.setFullYear(Number(_y))
  d.setMonth(Number(_m) - 1)
  d.setDate(Number(_d))
  return d.getTime().toString()
}
