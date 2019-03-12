layui.define(['jquery', 'utils', 'fetch', 'tools'], function (exports) {
        const $ = layui.jquery;
        const utils = layui.utils;
        const _ = layui.lodash;
        const fetch = layui.fetch;
        const storage = utils.localStorage;
        const tools = layui.tools;

        const staffApi = {
            //添加员工
            add: (info) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/staff/v1/add",
                        data: info,
                    })
                );
            },
            //员工列表
            getList: (query) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/staff/v1/list",
                        data: query
                    })
                );
            },
            //员工详情
            getDetail: (staffId) => {
                return tools.baseApi(
                    fetch({
                        method: 'get',
                        url: "/biz/api/staff/v1/detail",
                        params: {
                            staffId: staffId
                        },
                    })
                );
            },
            //修改员工信息接口
            edit: (info) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/staff/v1/edit",
                        data: info
                    })
                );
            },
            //启用员工
            disable: (staffId) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/staff/v1/disable",
                        params: {
                            staffId: staffId
                        },
                    })
                );
            },
            //禁用员工
            enable: (staffId) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/staff/v1/enable",
                        params: {
                            staffId: staffId
                        },
                    })
                );
            },
            //删除
            delete: (staffId) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/staff/v1/delete",
                        params: {
                            staffId: staffId
                        },
                    })
                );
            },
            //重置密码
            resetPassword: (ids) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/staff/v1/resetPassword",
                        data: ids
                    })
                );
            },

            //选择器专用
            selector: (query) => {
                return tools.baseApi(
                    fetch({
                        method: 'post',
                        url: "/biz/api/staff/v1/selector",
                        data: query
                    })
                );
            },

        };

        //输出menu接口
        exports('staffApi', staffApi);
    }
)
