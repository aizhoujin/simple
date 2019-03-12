/**
 * 获取本地缓存
 * @param key
 * @returns {*}
 */
function getItem(key) {
    const json = localStorage.getItem(key);
    if (typeof json == 'string') {
        try {
            const obj = JSON.parse(json);
            if (typeof obj == 'object' && obj) {
                return obj;
            } else {
                return json;
            }
        } catch (e) {
            return json;
        }
    }
    return {};
}

/**
 * 获取常量
 * @param key
 * @returns {*}
 */
function getConst(key) {
    const obj = getItem("const");
    if (obj) {
        return obj[key];
    }
    return {};
}

/**
 * 获取分类配置
 * @param key
 * @returns {*}
 */
function getClassify(key) {
    const obj = getItem("classify");
    if (obj) {
        return obj[key];
    }
    return {};
}

/**
 * 获得属性
 * @param v
 * @param attrs
 * @returns {*}
 */
function getAttr(v, attrs) {
    const arr = [];
    attrs.forEach(attr => {
        if (v === undefined) {
            if ('cKey' in attr) {
                arr.push({"k": attr.cKey, "v": attr.cValue});
            } else if ('title' in attr) {
                arr.push({"k": attr.title, "v": attr.v});
            }
        } else {
            if ('cKey' in attr && attr.cValue == v) {
                arr.push({"k": attr.cKey, "v": attr.cValue})
            } else if ('title' in attr && attr.v == v) {
                arr.push({"k": attr.title, "v": attr.v});
            }
        }
    });
    if (arr.length > 1) {
        return {"k": '', "v": '', "item": arr};
        // return arr
    } else if (arr.length > 0) {
        return arr[0];
    } else {
        return {"k": '', "v": ''};
    }

}

//常量
const cst = {

    /**
     * 是否
     * @param v
     * @returns {*}
     */
    is: (v) => {
        return getAttr(v, getConst("Is"));
    },

    //性别
    gender: (v) => {
        return getAttr(v, getConst("Gender"));
    },

    //用户职责
    majorDuty: (v) => {
        return getAttr(v, getConst("StaffMajorDuty"));
    },
    /**
     *角色类型
     * @param v
     * @returns {*}
     */
    roleType: (v) => {
        return getAttr(v, getConst("RoleType"));
    },

    /**
     * 招生来源类型
     * @param v
     * @returns {*}
     */
    sourceType: (v) => {
        return getAttr(v, getClassify("sourceType"));
    },

    /**
     * 意向级别
     * @param v
     * @returns {*}
     */
    intentLevel: (v) => {
        return getAttr(v, getClassify("intentLevel"));
    },
    /**
     * 进出库类型
     */
    accessType: (v) => {
        return getAttr(v, getClassify("accessType"));
    },

    /**
     * 咨询课程
     * @param v
     * @returns {*}
     */
    askClass: (v) => {
        return getAttr(v, getClassify("askClass"));
    },
    /**
     * 沟通方式
     * @param v
     * @returns {*}
     */
    askWayType: (v) => {
        return getAttr(v, getClassify("askWayType"));
    },
    /**
     * 沟通结果
     * @param v
     * @returns {*}
     */
    talkResult: (v) => {
        return getAttr(v, getClassify("talkResult"));
    },

    /**
     * 物品类型
     * @param v
     * @returns {*}
     */
    goodsType: (v) => {
        return getAttr(v, getClassify("goodsType"));
    },

    /**
     * 科目
     * @param v
     * @returns {*}
     */
    subject: (v) => {
        return getAttr(v, getClassify("subject"));
    },
    /**
     * 课程类型
     * @param v
     * @returns {*}
     */
    classType: (v) => {
        return getAttr(v, getClassify("classType"));
    },
    /**
     * 年级
     * @param v
     * @returns {*}
     */
    grades: (v) => {
        return getAttr(v, getClassify("grades"));
    },
    /**
     * 計費形式
     * @param v
     * @returns {*}
     */
    chargeMode: (v) => {
        return getAttr(v, getClassify("chargeMode"));
    },
    /**
     * 报名课程类型
     * @param v
     * @returns {*}
     */
    courseApplyType: (v) => {
        return getAttr(v, getClassify("courseApplyType"));
    },
    /**
     * 收费 结算类型
     * @param v
     * @returns {*}
     */
    settlementType: (v) => {
        return getAttr(v, getClassify("settlementType"));
    },
    /**
     * 报名课程状态
     * @param v
     * @returns {*}
     * @constructor
     */
    CourseApplyStatus: (v) => {
        return getAttr(v, getConst("CourseApplyStatus"));
    },
    /**
     * 收费单的状态
     * @param v
     * @returns {*}
     */
    chargeStatus: (v) => {
        return getAttr(v, getConst("CostStatus"));
    },
    /**
     * 发票类型
     * @param v
     * @returns {*}
     */
    taxType: (v) => {
        const taxType = [
            "不开票",
            "普通发票",
            "专用发票",
        ];
        return getAttr(v, taxType);
    },

    /**
     * 优惠活动
     * @param v
     * @returns {*}
     */
    discount: (v) => {
        const discount = [
            "打9.5折",
            "打9.0折",
            "打8.5折",
            "打8.0折",
        ];
        return getAttr(v, discount);
    },

    /**
     * 优惠券
     * @param v
     * @returns {*}
     */
    couponsList: (v) => {
        return getAttr(v, getClassify("couponsList"));
    },

    /**
     * 收款账户
     * @param v
     * @returns {*}
     */
    accountWalletList: (v) => {
        return getAttr(v, getClassify("accountWalletList"));
    },
    /**
     * 学生状态
     * @param v
     * @returns {{v, k}}
     */
    studentIntentStatus: (v) => {
        return getAttr(v, getClassify("studentIntentStatus"));
    },


    /**
     * 员工等级
     * @param v
     * @returns {*}
     */
    staffLevel: (v) => {
        return getAttr(v, getClassify("staffLevel"));
    },
    /**
     * 员工类型
     * @param v
     * @returns {*}
     */
    staffType: (v) => {
        return getAttr(v, getClassify("staffType"));
    },

    /**
     * 账户类型
     * @param v
     * @returns {*}
     */
    bankAccountType: (v) => {
        return getAttr(v, getClassify("bankAccountType"));
    },
    /**
     * 班级状态
     * @param v
     * @returns {{k, v, item}|{k, v}}
     */
    classStatus: (v) => {
        return getAttr(v, getConst("ClassStatus"));
    }

};