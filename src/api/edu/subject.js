import request from "@utils/request"

const BASE_URL = "/admin/edu/subject"

// 获取课程
export function reqGetSubject(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  })
}
