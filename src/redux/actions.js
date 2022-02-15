/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
import { SET_HEAD_TITLE, SAVE_USER, CLEAR_USER } from "./action-types";
import { reqLogin } from "../api";
import storageUtils from "../utils/storageUtils";
import { message } from "antd";

/*
设置头部标题的同步action
 */
export const setHeadTitle = (title) => ({ type: SET_HEAD_TITLE, data: title });

/*
保存用户信息的同步action
 */
export const saveUser = (user) => ({type: SAVE_USER, user})

/*
登陆的异步action
 */
export const login = (userInfo) => {
  return async (dispatch) => {
    // 1. 执行异步ajax请求
    const result = await reqLogin(userInfo); // {status: 0, data: user} {status: 1, msg: 'xxx'}
    // 2.1. 如果成功, 分发成功的同步action
    if (result.status === 0) {
      const user = result.data;
      // 保存local中
      storageUtils.saveUser(user);
      // 分发接收用户的同步action
      dispatch(saveUser(user));
    } else {
      // 2.2. 如果失败, 分发失败的同步action
      const msg = result.msg;
      message.error(msg);
      // dispatch(showErrorMsg(msg))
    }
  };
};

/*
退出登陆的同步action
 */
export const logout = () =>  {
  // 删除local中的user
  storageUtils.removeUser()
  // 返回action对象
  return {type: CLEAR_USER}
}
