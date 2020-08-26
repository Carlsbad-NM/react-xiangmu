import request from "@utils/request"

const BASE_URL = "/admin/edu/chapter"

// 获取章节分页列表
export function reqGetChapterList(courseId) {
  return request({
    url: `${BASE_URL}/1/10`,
    method: "GET",
    params: {
      courseId,
    },
  })
}

// 批量删除章节分页列表
export function reqDelChapterList(chapterIdList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: {
      idList: chapterIdList,
    },
  })
}
