import axios from "axios";
import qs from "qs";
import { Notification, MessageBox, Message } from 'element-ui'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: "http://localhost:9527/",  // api的base_url
  // baseURL: process.env.BASE_URL,  // api的base_url
  timeout: 5000  // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
  config.method === 'post'
    ? config.data = qs.stringify({...config.data})
    : config.params = {...config.params};
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return config;
}, error => {  //请求错误处理
  console.log(error)
  Promise.reject(error)
});

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {  //成功请求到数据
    //这里根据后端提供的数据进行对应的处理
    if (response.data.result === 'TRUE') {
      return response.data;
    } else {
      Notification.error({
        title: response.data
      })
    }
  },
  error => {  //响应错误处理
    console.log('error');
    console.log(error);
    console.log(JSON.stringify(error));

    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
);

export default service;
