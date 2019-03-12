layui.define(['jquery', 'utils', 'axios'], function (exports) {
        const $ = layui.jquery;
        const utils = layui.utils;
        const _ = layui.lodash;
        const axios = layui.axios;
        const storage = utils.localStorage;

        const baseURL = 'http://api.xiaoxunbang.com';
        //  const baseURL = 'http://39.98.196.28:8080';

        const from = "BIZ";

        const service = axios.create({
            baseURL: baseURL, // api的base_url
            timeout: 90000,                  // 请求超时时间  60秒
            withCredentials: true
        });
        // request拦截器
        service.interceptors.request.use(config => {
            if (storage.getToken() != null) {
                config.headers['token'] = storage.getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
            }
            config.headers['from'] = from;
            return config
        }, error => {
            // Do something with request error
            // console.dir(error) // for debug
            Promise.reject(error)
        });
        service.baseURL = baseURL;

        //输出menu接口
        exports('fetch', service);
    }
);