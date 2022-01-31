import ajax from './ajax'
// import jsonp from 'jsonp'
// import { message } from 'antd'

// const BASE = 'http://localhost:5000'
// 本来应该请求5000端口的服务器，由于跨域所以配置代理服务器3000端口，请求3000端口的代理服务器进行转发
const BASE = 'http://localhost:3000'

export const reqLogin = (userInfo) => ajax(BASE + "/login", userInfo, "POST")
export const reqGetCategoryList = (parentId) => ajax(BASE + "/manage/category/list", {parentId}, "GET")
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + "/manage/category/add", {parentId, categoryName}, "POST")
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + "/manage/category/update", {categoryId, categoryName}, "POST")





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