layui.define(['jquery', 'utils', 'fetch', 'tools'], function (exports) {
        const $ = layui.jquery;
        const utils = layui.utils;
        const _ = layui.lodash;
        const fetch = layui.fetch;
        const storage = utils.localStorage;
        const tools = layui.tools;

        const wareHouseApi = {
            //添加仓库
            add: (info) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/wareHouse/v1/add",
                        data: info,
                    })
                );
            },
            //仓库列表
            getList: (query) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/wareHouse/v1/list",
                        data: query
                    })
                );
            },
            //仓库详情
            getDetail: (id) => {
                return tools.baseApi(
                    fetch({
                        method: 'get',
                        url: "/biz/api/wareHouse/v1/detail",
                        params: {
                            id: id
                        },
                    })
                );
            },
            //修改仓库信息接口
            edit: (info) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/wareHouse/v1/edit",
                        data: info
                    })
                );
            },

            //删除仓库
            delete: (id) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/wareHouse/v1/delete",
                        params: {
                            id: id
                        },
                    })
                );
            },

        };

        //输出menu接口
        exports('wareHouseApi', wareHouseApi);
    }
)
