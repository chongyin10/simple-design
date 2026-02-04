import { productApiPath, manageApiPath, enginePath } from './httpClient'
import request from "./request"

function createOrder(params) {
    const url = `${productApiPath}/order/createOrder`
    return request.post(url, { ...params })
}


function swCreateOrder(params) {
    const url = `${productApiPath}/recharge/createOrder`
    return request.post(url, { ...params })
}

function getFinanceAccountApi() {
    const url = `${productApiPath}/finance/account`
    return request.post(url);
}

function buyProduct(params) {
    const url = `${productApiPath}/order/buyProduct`
    return request.post(url, { ...params });
}

function getChargeStatus(params) {
    const url = `${productApiPath}/recharge/status`
    return request.post(url, { ...params });
}

function cancelOrder(params) {
    const url = `${productApiPath}/order/cancel`
    return request.put(url, { ...params })
}

function getOpenUrl(params) {
    const url = `${manageApiPath}/user/open/url`
    return request.get(url)
}

// 查询是否阅读算力协议
const inquireIsRead = () => {
    const url = `${enginePath}/team/get-team-extra`
    return request.get(url)
}


const readProtocol = () => {
    const url = `${enginePath}/team/update-team-extra`
    return request.post(url)
}

// is authentification 
const isOpenAuthentification = () => {
    const url = `${enginePath}/operation/global-config-detail?moduleName=auth`
    return request.get(url)
}
  // 是否实名认证
const isAuthentication  = (memberName) => {
    const url = `${manageApiPath}/user/sw/getAuthInfo`
    return request.get(url, {params: {memberName}})
}


const shopCartApi = {
    createOrder,
    getFinanceAccountApi,
    buyProduct,
    getChargeStatus,
    cancelOrder,
    swCreateOrder,
    getOpenUrl,
    inquireIsRead,
    readProtocol,
    isOpenAuthentification,
    isAuthentication
}

export default shopCartApi;