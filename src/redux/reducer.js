/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
import storageUtils from "../utils/storageUtils"
import { combineReducers } from "redux";
import { SET_HEAD_TITLE, SAVE_USER, CLEAR_USER } from "./action-types";
/*
用来管理头部标题的reducer函数
 */
const initHeadTitle = ""
function headTitle(state=initHeadTitle, action) {
  const {type, data} = action
  switch (type) {
    case SET_HEAD_TITLE:
      return data
    default:
      return state
  }
}

/*
用来管理当前登陆用户的reducer函数
 */
const initUser = storageUtils.getUser()
function user(state=initUser, action) {
  const {type, user} = action
  switch (type) {
    case SAVE_USER:
      return user
    case CLEAR_USER:
      return {}
    default:
      return state
  }
}


/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
  headTitle, 
  user
})