/**
 * 金额千分位格式化
 * @param {*} value 值
 * @param {*} decimal 小数点位数
 */
export function moneyFormat(value, decimal = 2) {
    if (!value) return 0.00;
    if (value.length == 0) return 0.00;
    const reg = new RegExp(/(\d)(?=(\d{3})+\.)/g);
    return Number(value).toFixed(decimal).replace(reg, '$1,');
}

/**
 * 返回半年或者一年的月份
 * @param {*} n 取值，默认取值默认一年（前12个月）
 * @returns 
 */
export function getRecentMonth(n = 12) {
    let dataArr = [];
    let data = new Date();
    data.setMonth(data.getMonth() + 1, 1)//获取到当前月份,设置月份
    for (let i = 0; i < n; i++) {
        data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
        let m = data.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        dataArr.push(data.getFullYear() + "-" + (m))
    }
    return dataArr;
}

/**
 * CST时间转换为 yyyy-MM-dd HH:mm:ss
 * @param {*} date CST时间值
 * @param {*} format yyyy-MM-dd HH:mm:ss
 * @returns 
 */
export function dateCSTFormat(date, format = 'yyyy-MM-dd HH:mm:ss') {
    date = new Date(date);
    date.setHours(date.getHours() - 14);
    let dset = {
        "M+": date.getMonth() + 1, // 月
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 刻钟
        S: date.getMilliseconds(), // 毫秒
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let i in dset) {
        if (new RegExp("(" + i + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? dset[i] : ("00" + dset[i]).substr(("" + dset[i]).length));
        }
    }
    return format;
}

/**
 * 
 * @param {*} sDate 
 * @returns 
 */
export function dateToGMT(sDate) {
    var dateS = sDate.split(" ");
    var strGMT = dateS[0] + " " + dateS[1] + " " + dateS[2] + " " + dateS[5] + " " + dateS[3] + " GMT+0800";
    var date = new Date(Date.parse(strGMT));
    return date;
}

/**
 * 
 * @param {*} date 
 * @param {*} fmt 
 * @returns 
 */
export function dateFormat(fmt, date) {
    let o = {
        "M+": date.getMonth() + 1,                 //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
} 

/**
 * 东八区时间戳处理
 * @param {*} time 
 * @returns 
 */
export function processingWithTTime(time){
    if(!time) return time;
    var date = time.substr(0, 10); //年月日
    var hours = time.substring(11, 13);
    var minutes = time.substring(14, 16);
    var seconds = time.substring(17, 19);
    var timeFlag = date + ' ' + hours + ':' + minutes + ':' + seconds;
    timeFlag = timeFlag.replace(/-/g, "/");
    timeFlag = new Date(timeFlag);
    timeFlag = new Date(timeFlag.getTime() + 8 * 3600 * 1000);
    timeFlag = timeFlag.getFullYear() + '-' + ((timeFlag.getMonth() + 1) < 10 ? "0" + (timeFlag.getMonth() + 1) : (timeFlag.getMonth() + 1)) + '-' + (timeFlag.getDate() < 10 ? "0" + timeFlag.getDate() : timeFlag.getDate()) + ' ' + (timeFlag.getHours() < 10 ? "0" + timeFlag.getHours(): timeFlag.getHours()) + ':' + (timeFlag.getMinutes() < 10 ? "0" + timeFlag.getMinutes(): timeFlag.getMinutes()) + ':' + (timeFlag.getSeconds() < 10 ? "0" + timeFlag.getSeconds() : timeFlag.getSeconds());
    return timeFlag;
  }