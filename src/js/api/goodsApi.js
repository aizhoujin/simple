layui.define(['jquery', 'utils', 'fetch', 'tools'], function (exports) {
        const $ = layui.jquery;
        const utils = layui.utils;
        const _ = layui.lodash;
        const fetch = layui.fetch;
        const storage = utils.localStorage;
        const tools = layui.tools;

        const goodsApi = {
            //添加物品
            add: (info) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/goods/v1/add",
                        data: info,
                    })
                );
            },
            //物品列表
            getList: (query) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/goods/v1/list",
                        data: query
                    })
                );
            },
            //物品详情
            getDetail: (id) => {
                return tools.baseApi(
                    fetch({
                        method: 'get',
                        url: "/biz/api/goods/v1/detail",
                        params: {
                            id: id
                        },
                    })
                );
            },
            //修改物品信息接口
            edit: (info) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/goods/v1/edit",
                        data: info
                    })
                );
            },

            //删除物品
            delete: (id) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/goods/v1/delete",
                        params: {
                            id: id
                        },
                    })
                );
            },

        };

        //输出menu接口
        exports('goodsApi', goodsApi);
    }
)
