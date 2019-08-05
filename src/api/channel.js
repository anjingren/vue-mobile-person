import request from '@/utils/request.js'

// 获取频道数据
export const channelOptions = () => {
  return request({
    method: 'get',
    url: 'app/v1_0/user/channels'
  })
}
