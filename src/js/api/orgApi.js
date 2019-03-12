layui.define(['jquery', 'utils', 'fetch', 'tools'], function (exports) {
        const $ = layui.jquery;
        const utils = layui.utils;
        const _ = layui.lodash;
        const fetch = layui.fetch;
        const storage = utils.localStorage;
        const tools = layui.tools;

        const orgApi = {

            //员工切换公司
            changeCompany: (orgId) => {

                return new Promise((resolve, reject) => {
                    fetch({
                        method: 'post',
                        url: "/biz/api/org/v1/changeCompany",
                        params: {
                            orgId: orgId
                        },
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
        };

        //输出menu接口
        exports('orgApi', orgApi);
    }
)
