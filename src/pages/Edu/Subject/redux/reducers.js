import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT_LIST,
} from "./constants"

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
}

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach((item) => {
        item.children = []
      })
      return action.data

    case GET_SEC_SUBJECT_LIST:
      const SecItem = action.data.items
      const FirItem = prevState.items

      SecItem.length &&
        FirItem.forEach((item) => {
          if (item._id === SecItem[0].parentId) {
            item.children = SecItem
          }
        })
      return {
        ...prevState,
        items: FirItem,
      }

    case UPDATE_SUBJECT_LIST:
      prevState.items.forEach((item) => {
        if (item._id === action.data.id) {
          item.title = action.data.title
          return
        }

        item.children.forEach((secItem) => {
          if (secItem._id === action.data.id) {
            secItem.title = action.data.title
            return
          }
        })
      })
      return {
        ...prevState,
      }

    default:
      return prevState
  }
}
