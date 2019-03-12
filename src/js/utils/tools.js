layui.define(['jquery', 'form', 'queryEntry'], function (exports) {
    const $ = layui.jquery;


    const tools = {
        /**
         * 拼接url的方法
         * @param base
         * @param params
         * @returns {*}
         */
        getUrl: (base, params) => {
            if (params === undefined) {
                return base;
            }
            base = base + "?";
            params.forEach(obj => {
                const keys = Object.keys(obj);
                base = base + keys[0] + "=" + obj[keys[0]] + "&";
            });
            return base.slice(0, base.length - 1);

        },
        //获得url的param
        getUrlParam: (name) => {
            const qs = location.search.substr(1); // 获取url中"?"符后的字串+
            if (qs.length <= 0) {
                return layui.route && layui.route.params() ? layui.route.params()[name] : null;
            }

            const items = qs.length ? qs.split("&") : []; // 取得每一个参数项,
            let item = null;
            const len = items.length;
            for (let i = 0; i < len; i++) {
                item = items[i].split("=");
                const key = decodeURIComponent(item[0])
                const value = decodeURIComponent(item[1]);
                if (key === name) {
                    return value
                }
            }
            return null;
        },

        //基础的 api请求公共方法
        baseApi: (fetch) => {
            return new Promise((resolve, reject) => {
                fetch.then(response => {
                    if (response.status === 200 && response.data.code === 200) {
                        //如果后台没有返回任何数据 则提示 操作成功
                        if (response.data.data === undefined) {
                            // layer.msg("操作成功");
                        }
                        resolve(response.data)
                    } else if (response.status === 200 && response.data.code === 405) {
                        layer.msg("抱歉，您暂时无权访问此功能。");
                    } else {
                        layer.msg(response.data.msg);
                    }
                    resolve(response.data)

                }).catch(error => {
                    console.dir(error);
                    reject(error)
                })
            });
        },

        //禁用或启用 所有表单元素
        //isEdit 是否编辑（0禁用模式，1启用模式）
        //disabled 始终禁用标签
        //enabled 始终启用标签
        disabledForm:
            (isEdit, disabled, enabled) => {

                //label 的必填项 required 增加小红点
                $(".layui-form label").each((index, obj) => {
                    if ($(obj).attr("required")) {
                        $(obj).html("<span style='color:red;'>* </span>" + $(obj).text());
                    }
                    if ($(obj).text().length >= 5) {
                        $(obj).attr("title", $(obj).text());
                    }
                });
                if (isEdit === "0") {
                    // $(".layui-form #btn_submit").css("display", "block");
                    // $(".layui-form :input").removeAttr("disabled");
                    $(".layui-form #btn_submit").css("display", "none");
                    $(".layui-form :input").attr("disabled", "disabled").addClass("layui-disabled");
                }
                //处理始终需要禁用的
                if (disabled !== undefined) {
                    disabled.forEach((name) => {
                        $(".layui-form :input[name='" + name + "']").attr("disabled", "disabled").addClass("layui-disabled");
                    });
                }
                //处理始终都是可用的
                if (enabled !== undefined) {
                    enabled.forEach((name) => {
                        $(".layui-form :input[name='" + name + "']").removeAttr("disabled").removeClass("layui-disabled");
                    });
                }
            },

        /**
         * 搜索工具条 获取值
         * @param barId
         */
        searchData: (barId) => {
            let barData = {};
            //处理 文本框
            $("#" + barId + " input[type='text']").each((index, element) => {
                const key = $(element).attr("name");
                const value = $(element).val();
                if (value.length > 0) {
                    barData[key] = value;
                }
            });
            return barData;
        },
        /**
         * 获取查询工具条 的 query
         * @param barId
         * @param role
         */
        searchQuery: (barId, role) => {
            const data = tools.searchData(barId);
            const query = layui.queryEntry.get();
            if (Object.keys(data).length <= 0) {
                return query;
            }
            role.forEach(obj => {
                query.empty = false;
                const keys = Object.keys(obj);
                query[obj[keys[0]]][keys[0]] = data[keys[0]];
                delete data[keys[0]];
            });

            //没有匹配规则的 默认按照 equals处理
            for (const key in data) {
                query.empty = false;
                query.equals[key] = data[key];
            }
            return query;
        },

        /**
         * 将下拉框值转换input文本框值显示到页面上
         * @param id
         * @param name
         * @param value
         */
        convertSelect: (id, name, value) => {
            $("#" + id).html('<input type="text" name="' + name + '" disabled autocomplete="off" value="' + value + '" class="layui-input layui-disabled">');

        }

    };


    exports('tools', tools);
});
