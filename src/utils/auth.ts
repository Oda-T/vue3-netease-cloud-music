import Cookies from 'js-cookie'
// token key
const TOKEN_KEY = 'MUSIC_U'

export const getToken: () => string | undefined = () => {
  return Cookies.get(TOKEN_KEY)
}

export const setToken: (token: string) => void = token => {
  Cookies.set(TOKEN_KEY, token)
}

export const removeToken: () => void = () => {
  Cookies.remove(TOKEN_KEY)
}
