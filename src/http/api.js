import { isNull } from "@/utils/tools.js";
import Qs from 'qs'
import request from '@/http/request'; // api: https://github.com/axios/axios

export const httpApi = {

    /** 首页接口 */
    home: '',
}


// GET 请求
export function hkGetRequest(url, data) {
    if (isNull(url)) return {};
    const query = hkGetRequestQurty(data);
    if (!isNull(query)) {
        url = url + "?"
    }
    return request({
        url: url + `${query}`,
        method: 'get'
    })
}

// 上传 请求
export function hkUploadRequest(url, data, onUploadProgress) {
    if (isNull(url)) return {};
    return request({
        url: url,
        method: 'post',
        data,
        headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
        },
        onUploadProgress: (progressEvent) => {
            let complete = (progressEvent.loaded / progressEvent.total).toFixed(2) | 0;
            if (!isNull(onUploadProgress)) {
                onUploadProgress(complete)
            }
        },

    })
}
//POST 请求
export function hkPostRequest(url, data) {
    if (isNull(url)) return {};
    return request({
        url: url,
        method: 'post',
        data,

    })
}

export function hkGetRequestQurty(data) {
    let params = {};
    if (data !== null && data !== undefined) {
        for (let key in data) {
            let value = data[key];
            if (value !== null && value !== undefined && value !== "") {
                params[key] = value;
            }
        }
    }
    const query = Qs.stringify(params, {
        arrayFormat: 'brackets'
    })

    return query;
}
