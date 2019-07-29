// 获取token，设置token，移除token
// 设置token
export const setItem = (res) => {
  // 设置
  window.localStorage.setItem('TOKEN', JSON.stringify(res))
//   return JSON.stringify(user).token
}

// 获取token
export const getItem = () => {
//   const user = window.localStorage.getItem('TOKEN')
//   JSON.parse(user)
  JSON.parse(window.localStorage.getItem('TOKEN'))
}
// 移除token
export const removeItem = () => {
  window.localStorage.removeItem('TOKEN')
}
