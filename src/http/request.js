import axios from 'axios'

const ajax = axios.create({
    baseURL: '/api',
    // 跨域请求，允许保存cookie
    // withCredentials: true,
    // 超时时间
    timeout: 30000
})

// 请求拦截
ajax.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = "application/json;charset=UTF-8";

        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// 响应拦截
ajax.interceptors.response.use(
    response => {
        const res = response.data || {};
        if (res.code !== 0 && res.code !== 200) {
            console.error('------------接收返回成功数据------------\n' + Date() + "\n\n" + JSON.stringify(response));

            return Promise.reject(new Error(res['msg'] || '请求错误'));
        } else {
            console.warn('------------接收返回成功数据------------\n' + Date() + "\n\n" + JSON.stringify(response));
            return res;
        }
    },
    error => {
        console.error('------------接收返回错误数据------------\n' + Date() + "\n\n" + JSON.stringify(error))
        let msg = '请求失败';
        if (error.hasOwnProperty('message')) {
            msg = error.message
        } else if (error.hasOwnProperty('response')) {
            if (error.response.hasOwnProperty('data')) {
                const res = error.response;
                const resData = res.data;
                if (Object.prototype.toString.call(resData) === "[object String]") {
                    if (msg !== '') msg = resData + '';
                } else if (Object.prototype.toString.call(resData) === "[object Object]") {
                    if (resData.hasOwnProperty("message")) msg = resData.message + '';
                }
            }
        }
        return Promise.reject(new Error(msg));
    }
)

export default ajax
