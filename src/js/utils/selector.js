layui.define(['jquery', 'tableSelect', 'queryEntry'], function (exports) {
    const $ = layui.jquery;
    const tableSelect = layui.tableSelect;

    // layui.script(layui.cache.base + 'extend/tableSelect/style.css');

    /**
     * 初始化 config方法
     * @param config
     * @returns {*}
     */
    function initConfig(config) {
        //nameKey 和  elem 二选一
        config.nameKey = config.nameKey || 'name';
        config.elem = config.elem || ('#' + config.nameKey);
        config.idKey = config.idKey || "id";
        config.apiObj = config.apiObj || {};
        config.type = config.type || "radio";

        config.searchKey = config.searchKey || "name";

        // config.searchPlaceholder = config.searchPlaceholder;
        config.query = config.query || layui.queryEntry.get();
        config.page = config.page || true;
        config.height = config.height || 315;
        config.tableDone = config.tableDone || function () {

        };
        config.selectDone = config.selectDone || function (elem, data, nameKey) {
        };

        return config;
    }

    /**
     * 默认设置值方法
     * @param elem
     * @param data
     * @param nameKey
     * @param idKey
     * @param selectDone
     */
    function setVal(elem, data, nameKey, idKey, selectDone) {
        let copyValue = [];
        layui.each(data.data, function (index, item) {
            const nameArr = nameKey.split("\.");
            if (nameArr.length === 1) {
                copyValue.push(item[nameArr[0]]);
            } else if (nameArr.length === 2) {
                copyValue.push(item[nameArr[0]][nameArr[1]]);
            } else if (nameArr.length === 3) {
                copyValue.push(item[nameArr[0]][nameArr[1]][nameArr[2]]);
            } else if (nameArr.length === 4) {
                copyValue.push(item[nameArr[0]][nameArr[1]][nameArr[2]][nameArr[3]]);
            } else if (nameArr.length === 5) {
                copyValue.push(item[nameArr[0]][nameArr[1]][nameArr[2]][nameArr[3]][nameArr[4]]);
            }
        });

        elem.val(copyValue.join(","));
        const selected = elem.attr("ts-selected");
        $("#" + idKey).val(selected);
        $("input[name='" + idKey + "']").val(selected);
        selectDone(elem, data.data, nameKey);
    }


    const selector = {
        /**
         * 员工选择器
         * @param config
         */
        staffSelector: (config) => {
            initConfig(config);
            const page = config.page;
            const height = config.height;

            tableSelect.render({
                elem: config.elem,
                searchKey: config.searchKey,
                searchPlaceholder: config.searchPlaceholder || "输入员工姓名进行搜索",
                checkedKey: "id",
                apiObj: config.apiObj,
                query: config.query,
                table: {
                    page,
                    height,
                    cols: [[
                        {type: config.type},
                        {field: 'id', title: 'ID', hide: true},
                        {field: 'realName', title: '姓名', templet: (d) => d.infoEntity.realName},
                        {field: 'mobile', title: '手机号', templet: (d) => d.infoEntity.mobile},
                        {field: 'majorDuty', title: '职务', templet: (d) => cst.majorDuty(d.majorDuty).k},
                    ]],
                    done: (res, curr, count) => {
                        config.tableDone(res, curr, count)
                    }
                },
                done: function (elem, data) {
                    setVal(elem, data, "infoEntity.realName", config.idKey, config.selectDone);
                }
            });
        },

        /**
         * 咨询学员选择器
         * @param config
         */
        studentIntentSelector: (config) => {
            initConfig(config);
            const page = config.page;
            const height = config.height;

            tableSelect.render({
                elem: config.elem,
                searchKey: config.searchKey,
                searchPlaceholder: config.searchPlaceholder || "输入咨询学员姓名进行搜索",
                checkedKey: "id",
                apiObj: config.apiObj,
                query: config.query,
                table: {
                    page,
                    height,
                    cols: [[
                        {type: config.type},
                        {field: 'id', title: 'ID', hide: true},
                        {field: 'name', title: '姓名'},
                        {field: 'mobile', title: '手机号'},
                        {field: 'gender', title: '性别', templet: (d) => cst.gender(d.gender)},
                    ]],
                    done: (res, curr, count) => {
                        config.tableDone(res, curr, count)
                    }
                },
                done: function (elem, data) {
                    setVal(elem, data, "name", config.idKey, config.selectDone);
                }
            });
        },
        /**
         * 正式学员选择器
         * @param config
         */
        studentSelector: (config) => {
            initConfig(config);
            const page = config.page;
            const height = config.height;

            tableSelect.render({
                elem: config.elem,
                searchKey: config.searchKey,
                searchPlaceholder: config.searchPlaceholder || "输入学员姓名进行搜索",
                checkedKey: "id",
                apiObj: config.apiObj,
                query: config.query,
                table: {
                    page,
                    height,
                    cols: [[
                        {type: config.type},
                        {field: 'id', title: 'ID', hide: true},
                        {field: 'realName', title: '姓名', templet: (d) => d.infoEntity.realName},
                        {field: 'mobile', width: "120", title: '手机号', templet: (d) => d.infoEntity.mobile},
                        {field: 'gender', title: '性别', templet: (d) => cst.gender(d.infoEntity.gender).k},
                        {
                            field: 'cardId', width: "180", title: '身份证号',
                            templet: (d) => d.infoEntity.cardId ? d.infoEntity.cardId : ""
                        },
                    ]],
                    done: (res, curr, count) => {
                        config.tableDone(res, curr, count)
                    }
                },
                done: function (elem, data) {
                    setVal(elem, data, "realName", config.idKey, config.selectDone);
                }
            });

        },
        /**
         * 课程选择器
         * @param config
         */
        courseSelector: (config) => {
            initConfig(config);
            const page = config.page;
            const height = config.height;

            tableSelect.render({
                elem: config.elem,
                searchKey: config.searchKey,
                searchPlaceholder: config.searchPlaceholder || "输入课程进行搜索",
                checkedKey: "id",
                apiObj: config.apiObj,
                query: config.query,
                table: {
                    page,
                    height,
                    cols: [[
                        {type: config.type},
                        {field: 'id', title: 'ID', hide: true},
                        {field: 'name', title: '课程名称', templet: (d) => d.name},
                        {field: 'price', title: '单价', templet: (d) => d.price},
                        {field: 'subject', title: '科目', templet: (d) => cst.subject(d.subject).k},
                        {field: 'classType', title: '类型', templet: (d) => cst.classType(d.classType).k},
                    ]],
                    done: (res, curr, count) => {
                        config.tableDone(res, curr, count)
                    }
                },
                before: config.before,
                done: function (elem, data) {
                    setVal(elem, data, "name", config.idKey, config.selectDone);
                }
            });
        },
        /**
         * 班级选择器
         * @param config
         */
        classSelector: (config) => {
            initConfig(config);
            const page = config.page;
            const height = config.height;
            tableSelect.render({
                elem: config.elem,
                searchKey: config.searchKey,
                searchPlaceholder: config.searchPlaceholder || "输入班级进行搜索",
                checkedKey: "id",
                apiObj: config.apiObj,
                query: config.query,
                table: {
                    page,
                    height,
                    cols: [[
                        {type: config.type},
                        {field: 'id', title: 'ID', hide: true},
                        {field: 'name', title: '班级名称', templet: (d) => d.name},
                        {field: 'classNo', title: '班级编号', templet: (d) => d.classNo},
                        {
                            field: 'mainTeacherName',
                            title: '班主任',
                            templet: (d) => d.mainTeacherEntity ? d.mainTeacherEntity.infoEntity.realName : ""
                        },
                        {field: 'status', title: '状态', templet: (d) => cst.classStatus(d.status).k},
                    ]],
                    done: (res, curr, count) => {
                        config.tableDone(res, curr, count)
                    }
                },
                before: config.before,
                done: function (elem, data) {
                    setVal(elem, data, "name", config.idKey, config.selectDone);
                }
            });
        }
    };

    //输出menu接口
    exports('selector', selector);
});
