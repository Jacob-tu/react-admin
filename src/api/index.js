import ajax from './ajax'

export const login = (username, password) => ajax("/login", {username, password}, "POST")
export const addUser = (user) => ajax("/manage/user/add", user, "POST")
