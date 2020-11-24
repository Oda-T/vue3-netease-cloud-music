export const getName: (arr: Array<{ name: string }>) => string = arr => {
  const _arr = []
  for (let i = 0; i < arr.length; i++) {
    _arr.push(arr[i].name)
  }
  return _arr.join('/')
}
