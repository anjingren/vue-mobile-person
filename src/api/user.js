import request from '@/utils/request.js'
// 封装登录的方法
export const Login = ({ mobile, code }) => {
  return request({
    method: 'post',
    url: 'app/v1_0/authorizations',
    data: { mobile, code }
  })
}
