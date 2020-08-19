import request from "@utils/request"

const BASE_URL = "/admin/edu/subject"

// 获取课程分类一级列表
export function reqGetSubject(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  })
}
// 获取课程分类二级列表
export function reqGetSecSubject(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  })
}
// 添加课程分类
export function reqAddSecSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId,
    },
  })
}
// 更新课程分类
export function reqUpdateSubject(id, title) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      id,
      title,
    },
  })
}
// 删除课程分类
export function reqDeleteSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  })
}
