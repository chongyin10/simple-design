import { productApiPath } from "../services/httpClient";
import request from "../services/request";
import { teamId, userId } from '../utils/cookie';
import axios from "axios";
import FileSaver from 'file-saver';

const payStatus = [
    'Paid', 'NotPaid', 'PaidTimeoutCancel', 'UserCancel', 'End',
];

/**
 * 月流水汇总
 * @param {*} beginMonth 开始月份
 * @param {*} endMonth 结束月份
 * @param {*} billType 类型
 * @param {*} pageIndex 当前页码
 * @param {*} pageSize 当前页数
 */
const getBillAggregateApi = (beginMonth, endMonth, billType, pageIndex = 0, pageSize = 10) => {
    return request.post(`${productApiPath}/bill/aggregate`, {
        beginDate: beginMonth || null,
        endDate: endMonth || null,
        pageIndex,
        pageSize,
        billType,
        teamId
    });
}

/**
 * 概览-月汇总
 * @param {*} beginMonth 开始月份
 * @param {*} endMonth 结束月份
 * @param {*} pageIndex 当前页码
 * @param {*} pageSize 当前页数
 * @returns 
 */
const getPaymentAggregateListApi = (beginMonth, endMonth, pageIndex = 0, pageSize = 12) => {
    return request.post(`${productApiPath}/payment/aggregate`, {
        beginMonth: beginMonth || null,
        endMonth: endMonth || null,
        pageIndex,
        pageSize,
        teamId
    });
}

/**
 * 账单明细列表
 * @param {*} beginMonth 开始月份
 * @param {*} endMonth 结束月份
 * @param {*} pageIndex 当前页码
 * @param {*} pageSize 当前页数
 * @returns 
 */
const paymentListApi = (beginMonth, endMonth, pageIndex = 0, pageSize = 10) => {
    return request.post(`${productApiPath}/payment/list`, {
        beginDate: beginMonth || null,
        endDate: endMonth || null,
        pageIndex,
        pageSize,
        teamId
    });
}

/**
 * 订单列表
 * @param {*} id 订单号
 * @param {*} beginMonth 开始月份
 * @param {*} endMonth 结束月份
 * @param {*} orderType 订单类型: 新购、续费、退订
 * @param {*} chargeType 计费模式: 包年、包月、按量计费
 * @param {*} status 状态: 未支付、已支付、作废
 * @param {*} pageIndex 当前页码
 * @param {*} pageSize 当前页数
 * @returns 
 */
const orderListApi = (id, beginMonth, endMonth, orderType, chargeType, status, pageIndex, pageSize) => {
    let newStatus = '';
    if (status) {
        switch (status) {
            case "1":
                newStatus = "paid";
                break;
            case "2":
                newStatus = 'not_paid';
                break;
            default:
                newStatus = 'paid_timeout_cancel,user_cancel'

        }
    }
    let data = Object.assign({}, {
        searchingId: id || null,
        beginDate: beginMonth || null,
        endDate: endMonth || null,
        chargeType: chargeType || null,
        orderType: orderType ? Number(orderType) : null,
        orderStatus: newStatus || null,
        pageIndex: Number(pageIndex),
        pageSize: Number(pageSize),
        teamId
    })
    return request.post(`${productApiPath}/order/list`, data);
}

/**
 * 账号余额 
 * @returns 
 */
const getFinanceAccountApi = () => {
    return request.post(`${productApiPath}/finance/account`, { teamId });
}

/**
 * 流水信息
 * @param {*} beginMonth 开始月份
 * @param {*} endMonth 结束月份
 * @param {*} dealType 交易类型
 * @param {*} pageIndex 当前页码
 * @param {*} pageSize 页码条数
 * @returns 
 */
const getBillListApi = (billId, beginMonth, endMonth, dealType, pageIndex = 0, pageSize = 10) => {
    return request.post(`${productApiPath}/bill/list`, {
        billId: billId ? billId + '' : null,
        beginDate: beginMonth || null,
        endDate: endMonth || null,
        dealType: Number(dealType) || null,
        pageIndex,
        pageSize,
        teamId
    });
}

/**
 * 账单月汇总
 * @param {*} beginMonth 开始月份
 * @param {*} endMonth 结束月份
 * @param {*} pageIndex 当前页码
 * @param {*} pageSize 页码条数
 * @returns 
 */
const getPaymentAggregateApi = (beginMonth, endMonth, pageIndex = 0, pageSize = 10) => {
    return request.post(`${productApiPath}/payment/aggregate`, { beginMonth, endMonth, pageIndex, pageSize, teamId });
}

/**
 * 账单列表查询
 * @param {*} id 账单id
 * @param {*} beginMonth 开始月份
 * @param {*} endMonth 结束月份
 * @param {*} paymentType 账单类型: 预付费订单(包年包月)、后付费（按量）、退款
 * @param {*} pageIndex 当前页码
 * @param {*} pageSize 页码条数
 * @returns 
 */
const getPaymentListApi = (id, beginMonth, endMonth, paymentType, pageIndex = 0, pageSize = 10) => {
    return request.post(`${productApiPath}/payment/list`, {
        paymentId: id || null,
        beginDate: beginMonth || null,
        endDate: endMonth || null,
        paymentType: Number(paymentType) || null,
        pageIndex,
        pageSize,
        teamId
    });
}

/**
 * 
 * @param {*} payType 
 * @param {*} amount 
 * @returns 
 */
const getPayCodeApi = (payType, amount) => {
    return request.post(`${productApiPath}/recharge/pay`, { payType, amount, subject: '费用管理支付', teamId, userId });
}

/**
 * 充值状态接口
 * @param {*} tradeNo 
 * @returns 
 */
const getPayStatusApi = (tradeNo) => {
    return request.post(`${productApiPath}/recharge/status`, { tradeNo, teamId });
}

/**
 * 导出账单csv
 * @param {*} paymentId 
 * @param {*} dealType 
 * @param {*} paymentType 
 * @param {*} beginDate 
 * @param {*} endDate 
 * @returns 
 */
const paymentListCsvApi = (paymentId, dealType, paymentType, beginDate, endDate) => {
    return request.post(`${productApiPath}/payment/list`, { paymentId, dealType, paymentType, beginDate, endDate, teamId });
}

/**
 * 导出流水csv
 * @param {*} billId 
 * @param {*} dealType 
 * @param {*} beginDate 
 * @param {*} endDate 
 * @returns 
 */
const billListCsvApi = (dealType, beginDate, endDate) => {
    return request.post(`${productApiPath}/bill/list`, { billId, dealType, beginDate, endDate, teamId });
}

/**
 * 导出流水月汇总csv
 * @param {*} dealType 
 * @param {*} beginDate 
 * @param {*} endDate 
 * @returns 
 */
const billAggregateCsvApi = (dealType, beginDate, endDate) => {
    return request.post(`${productApiPath}/bill/aggregate`, { dealType, beginDate, endDate, teamId });
}

/**
 * 导出账单月汇总csv
 * @param {*} paymentType 
 * @param {*} beginDate 
 * @param {*} endDate 
 * @returns 
 */
const paymentAggregateCsvApi = (paymentType, beginDate, endDate) => {
    return request.post(`${productApiPath}/payment/aggregate`, { paymentType, beginDate, endDate, teamId });
}

/**
 * 导出文件csv，只支持在body传参数
 * @param {*} apiPath 接口api
 * @param {*} filename 文件名称
 * @param {*} resParams request入参数
 */
const exportCsvFile = async (apiPath, filename, resParams) => {
    axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const data = Object.assign({ ...resParams }, { teamId });
    const result = await axios.post(apiPath, data);
    var blob = new Blob([result.data], { type: "text/plain;charset=utf-8" });
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDay();
    filename = filename + new Date().getTime();
    FileSaver.saveAs(blob, `${filename}.csv`);
}

/**
 * 导出文件EXCEL，只支持在body传参数
 * @param {*} apiPath 接口api
 * @param {*} filename 文件名称
 * @param {*} resParams request入参数
 */
const exportExcelFile = async (apiPath, filename, resParams) => {
    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const data = Object.assign({ ...resParams }, { teamId });
    const result = await axios.post(apiPath, data, {
        responseType: 'arraybuffer'
    });
    var blob = new Blob([result.data], { type: 'application/vnd.ms-excel;charset=UTF-8' });
    let url = window.URL.createObjectURL(blob)
    const link = document.createElement('a') // 创建a标签
    link.download = `${filename}.xlsx`
    link.href = url
    link.click()
    URL.revokeObjectURL(url) // 释放内存
}

/**
 * 取消订单
 * @param {*} orderId 
 * @returns 
 */
const canncelApi = async (orderId) => {
    return await request.put(`${productApiPath}/order/cancel`, { orderId, teamId })
}

/**
 * 成员积分变更记录列表
 * @param {*} payload 
 * @returns 
 */
function getScoreUserChangeLogList(payload) {
    return request.get(`${gmApiPath}/score/user/change-log/list`, {
        params: {...payload}
    })
}
function getTeamCurrentScore() {
    return request.get(`${gmApiPath}/score/team/current-score`, {
        params: { teamId, userId }
    })
}

export default {
    paymentListApi,
    orderListApi,
    getFinanceAccountApi,
    getPaymentAggregateListApi,
    getBillAggregateApi,
    getBillListApi,
    getPaymentAggregateApi,
    getPaymentListApi,
    getPayCodeApi,
    getPayStatusApi,
    paymentListCsvApi,
    paymentAggregateCsvApi,
    billAggregateCsvApi,
    paymentAggregateCsvApi,
    billListCsvApi,
    exportCsvFile,
    canncelApi,
    exportExcelFile,
    getScoreUserChangeLogList,
    getTeamCurrentScore
}
