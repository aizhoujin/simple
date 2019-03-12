layui.define(['jquery', 'utils', 'fetch', 'tools'], function (exports) {
        const $ = layui.jquery;
        const utils = layui.utils;
        const _ = layui.lodash;
        const fetch = layui.fetch;
        const storage = utils.localStorage;
        const tools = layui.tools;

        const userApi = {
            //登陆
            login: (userName, password, kaptcha) => {
                return new Promise((resolve, reject) => {
                    fetch({
                        method: 'post',
                        url: "/biz/api/login",
                        params: {
                            userName: userName,
                            password: password,
                            kaptcha: kaptcha
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    }).then(response => {
                        if (response.status === 200 && response.data.code === 200) {
                            const user = response.data.data;
                            storage.setItem("token", user.token);
                            storage.setItem("perm", user.resourceList);
                            delete user["token"];
                            delete user["resourceList"];
                            storage.setItem("user", user);
                        }
                        else {
                            layer.msg(response.data.msg);
                        }
                        resolve(response.data)
                    }).catch(error => {
                        console.dir(error);
                        reject(error)
                    });
                });
            },
            //token登陆
            loginToken: () => {
                return new Promise((resolve, reject) => {
                    fetch({
                        method: 'post',
                        url: "/biz/api/loginByToken",
                    }).then(response => {
                        if (response.status === 200 && response.data.code === 200) {
                            const user = response.data.data;
                            storage.setItem("token", user.token);
                            storage.setItem("perm", user.resourceList);
                            delete user["token"];
                            delete user["resourceList"];
                            storage.setItem("user", user);
                            resolve(response.data)
                        }
                        else {
                            layer.msg(response.data.msg);
                        }
                        resolve(response.data)
                    }).catch(error => {
                        console.dir(error);
                        reject(error)
                    });
                });
            },
            /**
             * 获取基础数据级配置相关
             * @returns {Promise<any>}
             */
            cfxData: () => {
                return new Promise((resolve, reject) => {
                    fetch({
                        method: 'get',
                        url: "/biz/api/cfxData",
                        params: {
                            md5: storage.getItem("cfxMd5")
                        }
                    }).then(response => {
                        if (response.status === 200 && response.data.code === 200) {
                            const json = response.data.data;
                            if (json) {
                                storage.setItem("classify", json.classify);
                                storage.setItem("const", json.const);
                                storage.setItem("cfxMd5", json.md5);
                            }

                            resolve(response.data)
                        }
                        else {
                            layer.msg(response.data.msg);
                        }
                        resolve(response.data)
                    }).catch(error => {
                        console.dir(error);
                        reject(error)
                    });
                });
            },

            //获取验证码
            getKaptcha: () => {
                return fetch.baseURL + "/biz/kaptcha";
            },
            //退出登陆
            logout: () => {
                return new Promise((resolve, reject) => {
                    tools.baseApi(
                        fetch({
                            method: 'post',
                            url: "/biz/api/logout",
                        })
                    ).then((data) => {
                        //退出登陆后 把缓存清掉
                        storage.removeItem("token");
                        storage.removeItem("user");
                        storage.removeItem("perm");
                        storage.removeItem("classify");
                        storage.removeItem("const");
                        storage.removeItem("cfxMd5");
                        resolve(data)
                    }).catch(error => {
                        console.dir(error);
                        reject(error)
                    });
                });
            },
            //获取user信息
            getUser: () => {
                return storage.getItem("user");
            },
            /**
             * 获得公司对象
             * @returns {*}
             */
            getCompany: () => {
                return storage.getItem("user").company;
            },
            //获取token信息
            getToken: () => {
                return storage.getToken();
            },
            /**
             *判断是否有指定权限
             * @param key
             * @returns {boolean}
             */
            getPerm: (key) => {
                if (key === undefined) {
                    return storage.getItem("perm");
                }
                const permArr = storage.getItem("perm");
                if (!permArr || permArr === "undefined") {
                    return false;
                }
                for (let i = 0; i < permArr.length; i++) {
                    if (permArr[i].perms.indexOf(key) >= 0) {
                        return true;
                    }
                }
                return false;
            },
        };

        //输出menu接口
        exports('userApi', userApi);
    }
)
