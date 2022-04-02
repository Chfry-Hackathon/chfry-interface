/**
 * 判断是否为空
 */
// import {abc} from "./abc";
import { BigNumber } from "bignumber.js";


export function isNull(val) {
    if (typeof val === 'boolean') {
        return false;
    }
    if (typeof val === 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
        return false;
    }
    return false;
}

//
export function isMobileTerminal() {


}



/**
 * 输出语句
 */

import global from "../common/Global"

export function trace(message, ...optionalParams) {
    if (global.openLog) console.log(message, ...optionalParams);
}

/**
 * 保留4位有效数据
 * @param value （string/Number）
 */
export function toFixed4(value) {
    // let a = Math.floor(value * 10000) / 10000;
    let a = parseFloat(maxDecimal4(Number(value)));
    return a;
}

export function toFixed2(value) {
    let a = parseFloat(maxDecimal(Number(value)));
    return a;
}
export function toFixed3(value) {
    let a = parseFloat(maxDecimal3(Number(value)));
    return a;
}
export function toFixed10(value) {
    let a = parseFloat(maxDecimal10(Number(value)));
    return a;
}

export function toFixed1(value) {
    let a = parseFloat(maxDecimal1(Number(value)));
    return a;
}
export function toFixed0(value) {
    let a = parseFloat(maxDecimal0(Number(value)));
    return a;
}
let maxDecimal10 = (number) => {
    return String(number).replace(/^(.*\..{10}).*$/, "$1")
}
let maxDecimal4 = (number) => {
    return String(number).replace(/^(.*\..{4}).*$/, "$1")
}
let maxDecimal1 = (number) => {
    return String(number).replace(/^(.*\..{1}).*$/, "$1")
}
let maxDecimal3 = (number) => {
    return String(number).replace(/^(.*\..{3}).*$/, "$1")
}
let maxDecimal = (number) => {
    return String(number).replace(/^(.*\..{2}).*$/, "$1")
}
let maxDecimal0 = (number) => {
    return String(number).replace(/^(.*\..{0}).*$/, "$1")
}

export function toThousands(num) {
    if (Number(num) < 1000) return num;
    num = parseInt(Number(num));
    var num = (num || 0).toString(), re = /\d{3}$/, result = '';
    while (re.test(num)) {
        result = RegExp.lastMatch + result;
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) {
        result = num + result;
    }
    return result;
}

export function resetString(value,decimal) {
    // trace("resetString=",value,value=="",value==0)
    if(value==="") return "";
    if(value===0) return "0.00";


    value = Number(value)
    // let len = 8;
    // if(String(value).length<=len) return this.toThousands(value);
    // return this.toThousands(String(value).slice(0,len))+"...";
    if (value >= 1000 * 1000 * 1000 * 1000 * 1000) {
        return toFixed2(value / (1000 * 1000 * 1000 * 1000 * 1000)) + "p"
    }else if (value >= 1000 * 1000 * 1000 * 1000) {
        return toFixed2(value / (1000 * 1000 * 1000 * 1000)) + "t"
    } else if (value >= 1000 * 1000 * 1000) {
        return toFixed2(value / (1000 * 1000 * 1000)) + "g"
    } else if (value >= 1000 * 1000) {
        return toFixed2(value / (1000 * 1000)) + "m"
    } else if (value >= 1000) {
        return toFixed2(value / (1000)) + "k"
    }else {
        return ((typeof decimal) == 'undefined') ? value : ecimalPlaces(value, decimal)
        // return value;
    }
}

export const ecimalPlaces = (num, dec) => {
    return new BigNumber(num).decimalPlaces(dec,1)
}


export function hkGetTimeYMD(time) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    return dateFormatCC("mm.dd.YYYY", d)
}

/**
 * 时间格式转换
 * @param fmt  "YYYY-mm-dd HH:MM:SS"
 * @param date
 * @returns {*}   dateFormat("YYYY-mm-dd HH:MM:SS", new Date(Number(date)));
 */
export function dateFormatCC(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
        ;
    }
    ;
    return fmt;
}


export const accountEllipsis = (address) => {
    return address ? `${address.substring(0, 2)}...${address.substring(address.length - 4)}` : null;
};


export function thousands(num) {
    const str = num.toString();
    const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg,"$1,");
}