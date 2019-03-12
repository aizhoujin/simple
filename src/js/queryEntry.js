layui.define(['jquery'], (exports) => {

    const $ = layui.jquery;
    const queryEntry = {
        get: () => {
            return {
                "between": {},
                "equals": {},
                "groupBy": [],
                "gt": {},
                "gtEquals": {},
                "isIn": {},
                "isNull": {},
                "like": {},
                "lt": {},
                "ltEquals": {},
                "notBetween": {},
                "notEquals": {},
                "notIn": {},
                "notLike": {},
                "notNull": {},
                "orderBy": {},
                "page": 1,
                "size": 10,
                "empty": true
            }
        }

    };

    //输出utils接口
    exports('queryEntry', queryEntry);
});