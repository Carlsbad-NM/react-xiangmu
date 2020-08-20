import request from "@utils/request"

const BASE_URL = "/admin/edu/lesson"

// 获取章节课时列表
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  })
}
