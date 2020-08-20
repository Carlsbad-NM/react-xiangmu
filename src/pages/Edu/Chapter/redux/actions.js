import { reqGetAllCourse } from "@api/edu/course"
import { reqGetChapterList } from "@api/edu/chapter"
import { reqGetLessonList } from "@api/edu/lesson"

import { GET_ALL_COURSE, GET_CHAPTER_LIST, GET_LESSON_LIST } from "./constants"

function getCourseListSync(data) {
  return { type: GET_ALL_COURSE, data }
}
export function getCourseList() {
  return (dispatch) => {
    reqGetAllCourse().then((res) => {
      dispatch(getCourseListSync(res))
    })
  }
}

function getChapterListSync(data) {
  return { type: GET_CHAPTER_LIST, data }
}
export function getChapterList(courseId) {
  return (dispatch) => {
    return reqGetChapterList(courseId).then((res) => {
      dispatch(getChapterListSync(res))
    })
  }
}

function getLessonListSync(data) {
  return { type: GET_LESSON_LIST, data }
}
export function getLessonList(chapterId) {
  return (dispatch) => {
    return reqGetLessonList(chapterId).then((res) => {
      dispatch(getLessonListSync({ res, chapterId }))
    })
  }
}
