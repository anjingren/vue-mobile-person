// 获取token，设置token，移除token
// 设置token
const TOKEN = 'user'
export const setUser = (data) => {
  // 设置
  window.localStorage.setItem(TOKEN, JSON.stringify(data))
}

// 获取token
export const getUser = () => {
  JSON.parse(window.localStorage.getItem(TOKEN))
}
// 移除token
export const removeUser = () => {
  window.localStorage.removeItem(TOKEN)
}
