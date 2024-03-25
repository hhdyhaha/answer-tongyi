import axiosInstance from '@/utils/http'


// 通义千问api
export const tongYiApi = (params: object) => {
  return axiosInstance({
    url: '/aigc/text-generation/generation',
    method: 'post',
    data: params,
    timeout: 10000
  })
}