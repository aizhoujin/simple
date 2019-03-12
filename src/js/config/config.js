const extendArr = {
    fetch: "utils/fetch", //网络请求工具类
    tools: "utils/tools", //通用的工具类
    selector: "utils/selector", //通用的选择器

    userApi: 'api/userApi', //用户请求API
    staffApi: 'api/staffApi',//员工网络请求

    orgApi: 'api/orgApi',//校区网络请求
    wareHouseApi: 'api/wareHouseApi',//仓库网络请求
    goodsApi: 'api/goodsApi',//物品网络请求


    treeTable: 'extend/treeTable/treeTable',//树形表格
    treeSelect: 'extend/treeSelect/treeSelect',//树形下拉
    transferTool: 'extend/transfer/transferTool',//穿梭框
    authTree: 'extend/authTree/authTree',//穿梭框
    selectN: 'extend/select/selectN',//无限级联单选
    selectM: 'extend/select/selectM',//多选
    tableSelect: 'extend/tableSelect/tableSelect'//下拉表格

};
//oss的配置路径
const oss = 'https://oss.eanfang.net/';

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

layui.config({base: '/js/'})
    .extend(extendArr);

//通用工具
const cfx = {
    //获取oss路径
    ossPath: (path) => {
        return oss + path;
    },

    loadingObj: {},
    //打开加载动画
    loading: () => {
        layui.use(['layer'], () => {
            this.loadingObj = layui.layer.load(1);
        });
    },
    //关闭加载动画
    close: () => {
        layui.use(['layer'], () => {
            layui.layer.close(loadingObj);
            // layui.layer.closeAll();
        });
    },

    /**
     * 把常量转化成下拉框数据
     * @param attrs
     * @returns {Array}
     */
    getSelectData: (attrs) => {
        let dataArr = [];
        attrs = attrs.item;
        for (let i = 0; i < attrs.length; i++) {
            dataArr.push({"id": attrs[i].v, "name": attrs[i].k});
        }
        return dataArr;
    },

    /**
     * 获得日期
     * @param dateStr
     * @returns {string | *}
     */
    getDate: (dateStr) => {
        if (!dateStr) {
            return "";
        }
        const d = new Date(dateStr);
        return d.format('yyyy-MM-dd');
    },
    /**
     * 获得 指定数组对象里 某些字段 重新组装成数组返回
     * @param data
     * @param columns
     * @returns {Array}
     */
    getArrayByData: (data, columns) => {
        let array = [];
        data.forEach(d => {
            columns.forEach(c => {
                if (d[c]) {
                    if (columns.length == 1) {
                        array.push(d[c]);
                    } else {
                        array.push({d: d[c]});
                    }
                }
            });
        });
        return array;
    },
    /**
     * 获得值方法
     * @param value
     * @param opt
     */
    v: (value, def) => {
        if (def) {
            return value !== undefined ? value : def;
        } else {
            return value !== undefined ? value : "";
        }
    }


};

/**
 * 引用JS和CSS头文件
 */
const rootPath = getRootPath(); //项目路径

/**
 * 动态加载CSS和JS文件
 */
const dynamicLoading = {
    meta: function () {
        document.write('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">');
    },
    css: function (path, id) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required!');
        }
        if (id) {
            document.write('<link rel="stylesheet" type="text/css" href="' + path + '" id="' + id + '" >');
        } else {
            document.write('<link rel="stylesheet" type="text/css" href="' + path + '">');
        }

    },
    js: function (path, charset) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required!');
        }
        document.write('<script charset="' + (charset ? charset : "utf-8") + '" src="' + path + '"></script>');
    }
};

/**
 * 取得项目路径
 * @author wul
 */
function getRootPath() {
    //取得当前URL
    const path = window.document.location.href;
    //取得主机地址后的目录
    const pathName = window.document.location.pathname;
    const post = path.indexOf(pathName);
    //取得主机地址
    const hostPath = path.substring(0, post);
    //取得项目名
    const name = "";
    // const name = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
    return hostPath + name + "/";
}

//动态生成meta
dynamicLoading.meta();

//动态加载项目 JS文件
// dynamicLoading.js(rootPath + "/lib/layui/layui.js", "utf-8");
dynamicLoading.js(rootPath + "js/utils/tools.js", "utf-8");
dynamicLoading.js(rootPath + "lib/polyfill.min.js", "utf-8");
dynamicLoading.js(rootPath + "js/config/path.js", "utf-8");
dynamicLoading.js(rootPath + "js/config/verify.js", "utf-8");
dynamicLoading.js(rootPath + "js/config/cst.js", "utf-8");
dynamicLoading.js(rootPath + "js/Zj_public.js", "utf-8");

//动态加载项目 CSS文件

dynamicLoading.css(rootPath + "lib/layui/css/layui.css");
dynamicLoading.css(rootPath + "css/theme/default.css", "theme");
dynamicLoading.css(rootPath + "css/nprogress.css");
dynamicLoading.css(rootPath + "css/style.css");
dynamicLoading.css(rootPath + "css/Zj-public-list.css");
dynamicLoading.css(rootPath + "css/Zj-public.css");
// dynamicLoading.css(rootPath + "css/workflow/css/newWorkflow.css");

