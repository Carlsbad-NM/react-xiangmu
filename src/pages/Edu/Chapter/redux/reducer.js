import {
  GET_ALL_COURSE,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  DEL_CHAPTER_LIST,
  DEL_LESSON_LIST,
} from "./constants"

const initChapter = {
  allCourseList: [],
  chapterList: [],
}
export default function chapterList(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE:
      return {
        ...prevState,
        allCourseList: action.data,
      }

    case GET_CHAPTER_LIST:
      action.data.items.forEach((item) => {
        item.children = []
      })
      return {
        ...prevState,
        chapterList: action.data.items,
      }

    case GET_LESSON_LIST:
      const newChapterList = [...prevState.chapterList]
      newChapterList.forEach((item) => {
        if (item._id === action.data.chapterId) {
          item.children = action.data.res
        }
      })
      return {
        ...prevState,
        chapterList: newChapterList,
      }

    case DEL_CHAPTER_LIST:
      const chapterListOne = [...prevState.chapterList]
      const delChapterIds = action.data

      const newChapters = chapterListOne.filter((item) => {
        if (delChapterIds.indexOf(item._id) > -1) {
          return false
        }
        return true
      })
      return {
        ...prevState,
        chapterList: newChapters,
      }

    case DEL_LESSON_LIST:
      const chapterListTwo = [...prevState.chapterList]
      const delLessonIds = action.data

      chapterListTwo.forEach((item) => {
        item.children = item.children.filter((lessonItem) => {
          if (delLessonIds.indexOf(lessonItem._id) > -1) {
            return false
          }
          return true
        })
      })
      return {
        ...prevState,
        chapterList: chapterListTwo,
      }

    default:
      return prevState
  }
}
