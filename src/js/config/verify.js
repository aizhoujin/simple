layui.use(['form'], () => {
    // required（必填项）
    // phone（手机号）
    // email（邮箱）
    // url（网址）
    // number（数字）
    // date（日期）
    // identity（身份证）
    //表单验证扩展类
    layui.form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (!(/^[a-zA-Z][\w+]{5,17}$/.test(value))) {
                return '用户名以字母开头，长度在6-18之间';
            }
        },
        pass: [
            /^[\S]{6,18}$/,
            '密码必须6到18位，且不能出现空格'
        ]
    });
});