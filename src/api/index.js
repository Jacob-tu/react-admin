import ajax from "./ajax";
// import jsonp from 'jsonp'
// import { message } from 'antd'

// const BASE = 'http://localhost:5000'
// 本来应该请求5000端口的服务器，由于跨域所以配置代理服务器3000端口，请求3000端口的代理服务器进行转发
const BASE = "";

export const reqLogin = (userInfo) => ajax(BASE + "/login", userInfo, "POST");
export const reqGetCategoryList = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId }, "GET");
export const reqAddCategory = (parentId, categoryName) =>
  ajax(BASE + "/manage/category/add", { parentId, categoryName }, "POST");
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");
export const reqGetProductList = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize }, "GET");
export const reqSearchProduct = (pageNum, pageSize, searchType, searchName) =>
  ajax(
    BASE + "/manage/product/search",
    { pageNum, pageSize, [searchType]: searchName },
    "GET"
  );
export const reqGetCategoryById = (categoryId) =>
  ajax(BASE + "/manage/category/info", { categoryId }, "GET");

export const reqUpdateProductStatus = (productId, status) =>
  ajax(BASE + "/manage/product/updateStatus", { productId, status }, "POST");
export const reqDeletePic = (name) =>
  ajax(BASE + "/manage/img/delete", { name }, "POST");
export const reqAddProduct = (product) =>
  ajax(BASE + "/manage/product/add", product, "POST");
export const reqUpdateProduct = (product) =>
  ajax(BASE + "/manage/product/update", product, "POST");
export const reqGetRoleList = () =>
  ajax(BASE + "/manage/role/list", undefined, "GET");
export const reqAddRole = (roleName) =>
  ajax(BASE + "/manage/role/add", { roleName }, "POST");
export const reqUpdateRole = (role) =>
  ajax(BASE + "/manage/role/update", role, "POST");
export const reqGetUserList = () =>
  ajax(BASE + "/manage/user/list", undefined, "GET");
export const reqDeleteUser = (userId) =>
  ajax(BASE + "/manage/user/delete", { userId }, "POST");
export const reqAddUser = (userInfo) =>
  ajax(BASE + "/manage/user/add", userInfo, "POST");
export const reqUpdateUser = (userInfo) =>
  ajax(BASE + "/manage/user/update", userInfo, "POST");

// 请求天气的接口，暂不可用
// export const reqWeather = (city) => {

//   return new Promise((resolve, reject) => {
//     const url = `https://api.seniverse.com/v3/weather/now.json?location=${city}&ts=1443079775&ttl=300&uid=[your_uid]&sig=[your_signature]&callback=showWeather`
//     // 发送jsonp请求
//     jsonp(url, {}, (err, data) => {
//       console.log('jsonp()', err, data)
//       // 如果成功了
//       if (!err && data.status==='success') {
//         // 取出需要的数据
//         const {dayPictureUrl, weather} = data.results[0].weather_data[0]
//         resolve({dayPictureUrl, weather})
//       } else {
//         // 如果失败了
//         message.error('获取天气信息失败!')
//       }

//     })
//   })
// }
