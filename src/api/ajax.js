import { message } from "antd"
import axios from "axios"

// 用Promise封装统一处理error
export default function ajax(url, data={}, type) {
  return new Promise((resolve, reject) => {
    let promise
    if(type === "GET") {
      promise = axios.get(url, {
        params: data
      })
    }else {
      promise = axios.post(url, data)
    }
    promise.then(res => {
      resolve(res.data)
    }).catch(err => message.error(err.message))
  })
}